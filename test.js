var TelldusAPI = require('./telldus-live');

var publicKey   = '...'
  , privateKey  = '...'
  , token       = '...'
  , tokenSecret = '...'
  , cloud
  ;

cloud = new TelldusAPI.TelldusAPI({ publicKey    : publicKey
                                  , privateKey : privateKey }).login(token, tokenSecret, function(err, user) {
  if (!!err) return console.log('login error: ' + err.message);

  console.log('user: '); console.log(user);

  cloud.getSensors(function(err, sensors) {
    var f, i;

    if (!!err) return console.log('getSensors: ' + err.message);

    f = function(id) {
      return function(err, sensor) {
        if (!!err) return console.log('getSensorInfo #' + id + ': ' + err.message);

        console.log('sensor #' + id + ': '); console.log(sensor);
      };
    };

    console.log('sensors: '); console.log(sensors);
    for (i = 0; i < sensors.length; i++) cloud.getSensorInfo(sensors[i], f(sensors[i]));
  }).getDevices(function(err, devices) {
    var f, i;

    if (!!err) return console.log('getDevices: ' + err.message);

    f = function(id) {
      return function(err, device) {
        if (!!err) return console.log('getDeviceInfo #' + id + ': ' + err.message);

        console.log('device #' + id + ': '); console.log(device);
      };
    };

    console.log('devices: '); console.log(devices);
    for (i = 0; i < devices.length; i++) cloud.getDeviceInfo(devices[i], f(devices[i]));
  });
}).on('error', function(err) {
  console.log('background error: ' + err.message);
});
