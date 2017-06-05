var resourceTracking = require('./../app/models/resourceTracking');
var userLevel = require('./../app/models/userLevel');
var stepTracking = require('./../app/models/userLevel');

var ActionsHandler = function () {
    this.resourseLinkTrack = handleResourseLinkTrack;
    this.userLevel = handleUserLevelRequest;
    this.userLevelStartTime = userLevelStartTime;
    this.stepTracking = handleStepTracking;
}

function getTime() {
    return new Date().getTime();
}

function handleStepTracking(req, res) {
    var data = req.body;

    stepTracking.findOne({
        'user_id': data['user_id'],
        'level': data['level'],
        'step': data['step']
    }, function (err, resource) {

        if (err) {
            return res.status(404).json(err);
        }
        if (!resource) {
            resource = new stepTracking({
                course_id: data.course_id,
                level: data.level,
                step: data.step,
                count: 1,
                modified_at: getTime(),
                created_at: getTime()
            });
            resource.save(function(err) {
                if (err) console.log(err);
                return res.status(200).json(resource);
            });
        } else {
            //found user. Return
            resource.count = resource.count+1;
            resource.modified_at = new Date();
            resource.save(function(err) {
                if (err) console.log(err);
                return res.status(200).json(resource);
            });
        }
    });

};

function handleResourseLinkTrack(req, res) {
    var data = req.body;

    resourceTracking.findOne({
        'user_id': data['user_id'],
        'resource_link': data['resource_link'],
        'level': data['level'],
        'step': data['step']
    }, function (err, resource) {

        if (err) {
            return res.status(404).json(err);
        }
        if (!resource) {
            resource = new resourceTracking({
                course_id: data.course_id,
                resource_link: data['resource_link'],
                level: data.level,
                step: data.step,
                count: 1,
                modified_at: getTime(),
                created_at: getTime()
            });
            resource.save(function(err) {
                if (err) console.log(err);
                return res.status(200).json(resource);
            });
        } else {
            //found user. Return
            resource.count = resource.count+1;
            resource.modified_at = new Date();
            resource.save(function(err) {
                if (err) console.log(err);
                return res.status(200).json(resource);
            });
        }
    });

};

function handleUserLevelRequest(req,res){
    var data = req.body;
    userLevel.findOne({ 'user_id':data.user_id,'course_id':data.course_id,'level':data.level}, function(err, levelInfo){

        if (err) {
            return res.status(404).json(err);
        }
        if (!levelInfo) {
            levelInfo = new userLevel({
                course_id: data.course_id,
                user_id: data['user_id'],
                level: data.level,
                count: 1,
                modified_at: getTime(),
                created_at: getTime()
            });
            levelInfo.save(function(err) {
                if (err) console.log(err);
                res.status(200).json(levelInfo);
            });
        }
    });
};

function userLevelStartTime(req,res){

    var data = req.params;
    userLevel.findOne({ 'user_id':data.user_id,'course_id':data.course_id,'level':data.level}, function(err, levelInfo){
        if (err) {
            return res.status(404).json(err);
        } else {
            return res.status(200).json(levelInfo);
        }
    });

};

module.exports = ActionsHandler;