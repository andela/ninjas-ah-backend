const dbFindSingle = async (model, whereCondition) => model.findOne({
  where: whereCondition
});

const dbFindAll = async (model, whereCondition) => model.findAll({
  where: whereCondition
});

const dbCreate = async (model, condition) => model.create(condition);

const dbDelete = async (model, whereCondition) => model.destroy({
  where: whereCondition
});

const dbUpdate = async (model, condition, whereCondition) => model.update(
  { condition },
  {
    where:
    whereCondition
  }
);

module.exports = {
  dbFindSingle,
  dbFindAll,
  dbCreate,
  dbDelete,
  dbUpdate
};
