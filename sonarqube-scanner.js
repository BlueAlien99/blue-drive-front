const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://172.17.0.7:9000', // temporarily via ip adress of sonarqube docker container
    options: {
      'sonar.projectName': 'blue-drive-front',
      'sonar.sources': './src',
    },
  },
  () => process.exit()
);
