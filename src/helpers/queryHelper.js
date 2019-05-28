const dbFindSingle = async (model, whereCondition = {}) => model.findOne({
  where: whereCondition,
  logging: false
});

const dbFindAll = async (model, whereCondition) => model.findAll({
  where: whereCondition,
  logging: false
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
