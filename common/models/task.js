module.exports = function(Task) {
  Task.beforeSave = function (next, task) {
    task.created = new Date()
    task.status = 'settling'
    Task.findOne({order:'serialNumber DESC'}, function (err, lastTask) {
      task.serialNumber = lastTask.serialNumber+1
      next()
    })
  }
};
