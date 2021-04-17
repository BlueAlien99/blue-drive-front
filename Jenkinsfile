pipeline {
  agent none

  stages {
    stage('Build') {
      agent {
        docker { 
          image 'node:14' 
          reuseNode true
        }
      }
      steps {
        script {
          echo 'Build...'
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Test') {
      agent {
        docker { 
          image 'node:14' 
          reuseNode true
        }
      }
      steps {
        script {
          echo 'Test...'
          sh 'npm run lint'
          sh 'npm run type-check'
        }
      }
    }

    stage('Deploy') {
      agent any
      steps {
        script {
          echo 'Deploy...'
          try {
            sh 'docker container stop gatsby-serve'
            sh 'docker container rm gatsby-serve'
          }
          catch(err) {
            echo '${err}'
          }
          sh 'chmod +x ./docker/deploy.sh'
          sh './docker/deploy.sh'
        }
      }
    }
  }
}