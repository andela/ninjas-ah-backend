export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Articles',
    [
      {
        userId: 1,
        slug: 'rosie-make-them-easy-1dh6jv9cn4sz',
        title: 'Ogo zevho taotu avasa at',
        description:
            'Mikwe naj wozoeve gondumhe cetacam aze arozepas go anahef hikeeko ugicuji locial kusezo feduzuna ha.',
        body:
            'Ovcur zar ugitahe vi fufhejri fegrom seb kogaba wocuf tefujef lob ope loddas cergi bipgim gusuv zidutro kufumo. Tacensum pijdif cunedmag ih ok mewwovu vij tucbisaf oluema cujofu mohzizi udneg ocilezu sik turok ag. Rawuom dekhuwas armof wuiwo japzi titda duv tintuc diasol weeva koc iffafnof hiadi. Biesufuv cil jeh jafel upior fodkauj ledzur ja libini uvfioge ehe wivhalo kag zavido busho voitujoc po. Rogeh wonub uwiw ber wutodamo lan jurwabaz bewsumwu renekir ena lohtuhon liphaha eveimjod izicebi fenop. Kaolenov ve ap lawfit egbohuro setca vebioha dubsad elu wakve tuguhuvud newlod dafevzi aro mudpezva afasu ajlig. Sankep bacucli hi cod guhjac mu piafvuk nalijis sujok hubgin viccor lenej wes. Faciljud okuzow cojigpof bib nu hopemkup cegic puita fico legubpes ibosa zun bona tu cedit lagu. Wokajeb otudim avponug seroh nepada honowca umuju noli wikodbi wirun tabu befeur lutawmed paokid geli sokabi. Bufevu um miflazful copdes ollifop romtib letken jac nuh pumgemwa suzep inwupi.',
        tagList: '{"Capetown","Cairo"}',
        status: 'draft',
        readTime: 0,
        coverUrl: 'placeholder.jpg',
        createdAt: '2019-04-29T22:00:00',
        updatedAt: '2019-04-29T22:00:00'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
