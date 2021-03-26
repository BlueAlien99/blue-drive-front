pipeline {
  agent {
    docker { 
      image 'node:14' 
      reuseNode true
    }
  }

  stages {
    stage('Build') {
      steps {
        script {
          echo 'Build...'
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Test') {
      steps {
        script {
          echo 'Test...'
          sh 'npm run lint'
          sh 'npm run type-check'
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          echo 'Deploy...'
        }
      }
    }
  }
}