pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    parameters {
        choice(
            choices: ['NotificationBuild' , 'NotificationRevert'],
            description: '',
            name: 'REQUESTED_ACTION')
    }

    environment {
        ENVEXECFILE = "http://192.168.1.140:3000/INFINITI/email_templates.git"
        ENVDELFILE = ""
        GITEAURL = "http://192.168.1.140:3000/INFINITI/email_templates.git/commit"
        USERNAME_PASSWORD = credentials("0e3b896a-8542-487b-ad04-2ba5d47c3ce8")
        MYSQL_CREDENTIALS = credentials("4859d2d7-60a2-43c8-bffa-0e0d8566eaf6")
        PRODUCT_NAME = "NOTIFICATION_Email_template"
        REPOSITORY_NAME = "GRM_Email_template"
        SERVER_IP = "35.154.142.88"
        SERVER_NAME = "ML_testing"
        SERVER_FOLDER_PATH = "/home/Staging/GRM_Notification_Frontend"
        DOCSTRING=""
    }
    stages {
         stage('RevertNotificationBuild') {
           when {
                beforeInput true
                expression { params.REQUESTED_ACTION == 'NotificationRevert' }
            }
           input {
                message 'Please enter build number to revert Notification React build ?'
                parameters {
                    string(name: 'angularrevertbuild_number', defaultValue: '', description: 'Enter your Job build number to revert angular build ?')
                }
            }


            steps {
                wrap([$class: 'BuildUser']) {
                    echo 'Building Zip files..'
                    script {
                        if (env.angularrevertbuild_number) {
                            echo "angularrevertbuild_number is the ${angularrevertbuild_number}"
                        }
                    }

                    sh '''
                        echo "sudo cd /home/Staging/GRM_Notification_Frontend" > angularrevertscript_$BUILD_NUMBER.sh
                        echo "sudo cp -R notification notification_$BUILD_NUMBER" >> angularrevertscript_$BUILD_NUMBER.sh
                        echo "sudo rm -rf notification" >> angularrevertscript_$BUILD_NUMBER.sh
                        echo "sudo cp -R notification_${angularrevertbuild_number} notification" >> angularrevertscript_$BUILD_NUMBER.sh


                        mkdir -p angularrevert
                        sudo chmod -R 777 angularrevert
                        sudo mv angularrevertscript_$BUILD_NUMBER.sh angularrevert/angularrevertscript_$BUILD_NUMBER.sh
                        sudo chmod -R 777 angularrevert     
                        #make zip file to execute in server
                        cd angularrevert
                        sudo zip -r angularrevertjob_$BUILD_NUMBER.zip angularrevertscript_$BUILD_NUMBER.sh
                        sudo rm -f angularrevertscript_$BUILD_NUMBER.sh

                        '''
                }
            }
        }

stage('Notification React Build Code') {
                  when {
                beforeInput true
                expression { params.REQUESTED_ACTION == 'NotificationBuild' }
            }
            input {
                message 'Do you want to build Notification React files? - (For Yes - enter "Y", No - enter "N")?'
                ok "Approve"
                parameters {
                    string(name: 'is_angularbuild_need', defaultValue: '', description: 'Enter your choice for react build ?')
                }
              }
            
            steps {
                wrap([$class: 'BuildUser']) {
                    echo 'Building Angular files..'
                    sh '''
                        #Take Angular Build
                        echo "$is_angularbuild_need"
                        if [ "$is_angularbuild_need" = "Y" ] || [ "$is_angularbuild_need" = "Yes" ] || [ "$is_angularbuild_need" = "y" ] ;
                        then
                            sudo docker pull node:20.10.0
                            sudo docker run --rm -i   -v $WORKSPACE:/app   -w /app   node:20.10.0   bash -c "corepack enable && yarn install && yarn run build"
                            sudo rm -rf build
                            sudo mv dist build

                            tar -cJf build.tar.xz build
                            #make build directoy
                            mkdir -p $WORKSPACE/angularbuild
                            chmod -R 777 $WORKSPACE/angularbuild
                            mkdir -p /var/www/html/deployment/jobs/$JOB_NAME/$BUILD_NUMBER
                            chmod -R 777 /var/www/html/deployment/jobs/$JOB_NAME/$BUILD_NUMBER
                            cp build.tar.xz /var/www/html/deployment/jobs/$JOB_NAME/$BUILD_NUMBER/build.tar.xz
                            cp build.tar.xz angularbuild/build.tar.xz
                        fi
                        '''
               }
            }
        } 
      
         stage('Revert to previous Notification React Build') {
          when {
                beforeInput true
                expression { params.REQUESTED_ACTION == 'NotificationRevert' }
            }


        input {
                message 'Do you want to revert previous Notification React build to server? - (For Yes - enter "Y", No - enter "N")? Kindly approve the revert?'
                ok "Approve"
                parameters {
                    string(name: 'is_angularrevert_need', defaultValue: '', description: 'Enter your choice for build ?')  
 
                }
                submitter "balaji,kaviyarasan,karthickd,pradeep"
                submitterParameter 'approved_user' 
                
            }
            
            steps('Revert previous angular build to server') {
                wrap([$class: 'BuildUser']) {
                       script {
                        if (env.is_angularrevert_need == 'Y' || env.is_angularrevert_need == 'y' || env.is_angularrevert_need == 'Yes') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'ML_testing', 
                                    transfers: [
                                        sshTransfer(
                                            cleanRemote: false,
                                            excludes: '', 
                                            execCommand: 'cd /home/Staging/GRM_Notification_Frontend && unzip -o angularrevertjob_$BUILD_NUMBER.zip && rm -f angularrevertjob_$BUILD_NUMBER.zip.zip && sudo chmod 777 angularrevertscript_$BUILD_NUMBER.sh && sh angularrevertscript_$BUILD_NUMBER.sh && rm -f *.zip && rm -f angularrevertscript_$BUILD_NUMBER.sh && sudo chmod -R 777 *', 
                                            execTimeout: 30000, 
                                            flatten: false, 
                                            makeEmptyDirs: false, 
                                            noDefaultExcludes: false, 
                                            patternSeparator: '[, ]+', 
                                            remoteDirectory: '//home/Staging/GRM_Notification_Frontend/', 
                                            remoteDirectorySDF: false, 
                                            removePrefix: 'angularrevert', 
                                            sourceFiles: 'angularrevert/angularrevertjob_$BUILD_NUMBER.zip'
                                        )
                                    ], 
                                    usePromotionTimestamp: false, 
                                    useWorkspaceInPromotion: false, 
                                    verbose: true
                                )
                            ]
                        )
                    }
                }
	        }
        }
    }
               stage('Build & Move Notification React code') {
          when {
                beforeInput true
                expression { params.REQUESTED_ACTION == 'NotificationBuild' }
            }
            input {
                message 'Do you want move the Notification react build files? - (For Yes - enter "Y", No - enter "N")? Kindly approve the file movement?'
                ok "Approve"
                parameters {
                    string(name: 'is_build_need', defaultValue: '', description: 'Enter your choice for angular build ?')   
                }
                submitter "balaji,kaviyarasan,karthickd,pradeep"
                submitterParameter 'approved_user' 
            }
            
            steps {
                wrap([$class: 'BuildUser']) {
                    echo 'Building Angular files..'
                    script {
                        if (env.is_build_need == 'Y' || env.is_build_need == 'y' || env.is_build_need == 'Yes') { 
                            sshPublisher(
                                publishers: [
                                    sshPublisherDesc(
                                        configName: 'ML_testing', 
                                        transfers: [
                                            sshTransfer(
                                                cleanRemote: false,
                                                excludes: '', 
                                                execCommand: 'cd /home/Staging/GRM_Notification_Frontend && mv notification notification_$BUILD_NUMBER && tar xf build.tar.xz && mv build notification && sudo chmod -R 777 /home/Staging/GRM_Notification_Frontend/notification', 
                                                execTimeout: 30000, 
                                                flatten: false, 
                                                makeEmptyDirs: false, 
                                                noDefaultExcludes: false, 
                                                patternSeparator: '[, ]+', 
                                                remoteDirectory: '//home/Staging/GRM_Notification_Frontend/', 
                                                remoteDirectorySDF: false, 
                                                removePrefix: 'angularbuild', 
                                                sourceFiles: 'angularbuild/build.tar.xz'
                                            )
                                        ], 
                                        usePromotionTimestamp: false, 
                                        useWorkspaceInPromotion: false, 
                                        verbose: true
                                    )
                                ]
                            )
                        }
                    }
                }
            }
        }
    }    
    post { 
        always {
          script {
            if (env.REQUESTED_ACTION == 'NotificationBuild') {
            sh '''
            QUERYSTRING=""
            RESULT=`curl -X GET "http://localhost/deployment/api.php?JOB_NAME=$JOB_NAME&JOB_ID=$BUILD_NUMBER"`
            QUERYSTRING="UPDATE jenkins_deployment_data SET job_status='$RESULT',approved_by='$approved_by',approved_datetime = '$approved_date' WHERE job_id = '${BUILD_NUMBER}' AND job_name = '${JOB_NAME}';"
            NOW=`date "+%Y_%m_%d_%H_%M_%S"`

            '''

            echo "Final Output --> ${currentBuild.result}"
           }
          else {
           echo 'Files reverted'
           }
           }
        }
    }
}
