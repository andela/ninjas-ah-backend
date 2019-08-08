import socket from 'socket.io';
import * as tokenHelper from './tokens';
import { Chat, User } from '../queries';

export default (server) => {
  const io = socket(server);
  io.sockets.on('connection', (sock) => {
    sock.on('connectedToChat', async () => {
      let chats = [];
      const savedChats = await Chat.getAll();

      if (!savedChats.errors) {
        savedChats.forEach((savedChat) => {
          const user = savedChat.get().User.get();
          delete savedChat.dataValues.User;
          const chat = { ...savedChat.get(), user };
          chats = [...chats, chat];
        });
        sock.emit('allMessages', chats);
      }
    });

    sock.on('deleteChat', async (chatId, userId) => {
      const deleteChat = Chat.remove(chatId, userId);

      if (!deleteChat.errors) {
        sock.emit('chatDeleted', chatId, userId);
        sock.broadcast.emit('chatDeleted', chatId, userId);
      }
    });

    sock.on('message', async (data) => {
      const { message, token } = data;
      const { id: userId } = tokenHelper.decode(token);
      const created = (userId && (await Chat.save(userId, message))) || null;
      if (created) {
        const findUser = await User.findOne({ id: userId });
        delete findUser.password;

        sock.emit('newMessage', { ...created, user: findUser });
        sock.broadcast.emit('newMessage', { ...created, user: findUser });
      }
    });
  });
};
