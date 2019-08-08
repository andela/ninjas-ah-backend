const dbFindSingle = async (model, whereCondition = {}, include) => model.findOne({
  where: whereCondition,
  logging: false,
  include
});

const dbFindAll = async (model, whereCondition, offset = 0, limit = 20, include) => model.findAll({
  offset,
  limit,
  where: whereCondition,
  logging: false,
  include
});

const dbCreate = async (model, condition) => model.create(condition, { logging: false });

const dbDelete = async (model, whereCondition) => model.destroy({
  where: whereCondition,
  logging: false
});
const dbUpdate = async (model, condition, whereCondition = {}) => {
  model.update(condition, { where: whereCondition, logging: false });
};

export {
  dbFindSingle, dbFindAll, dbCreate, dbDelete, dbUpdate
};
