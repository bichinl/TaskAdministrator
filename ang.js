var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', function($scope, $http) {
    $scope.message = 'Tasks Administrator';
    $scope.tasks = {};
    $scope.tasksassigned = {};
    $scope.users = {};
    $scope.goNewTask = false;
    $scope.goNewUser = false;
    $scope.formTask = {};
    $scope.formUser = {};
    $scope.selectUser = {};

    var markedTasks = [];

    $scope.alltasks = function(){
        $http.get('/alltasks')
            .success(function(data){
                // $scope.lenguajes = data;
                $scope.tasks = data;
            }).error(function(err){
                alert('Err: ',err);
            });
    }
    $scope.alltasks();

    $scope.alltasksassigned = function(){
        $http.get('/alltasksassigned')
            .success(function(data){
                // $scope.lenguajes = data;
                $scope.tasksassigned = data;
            }).error(function(err){
                alert('Err: ',err);
            });
    }
    $scope.alltasksassigned();

    $scope.allusers = function(){
        $http.get('/allusers')
            .success(function(data){
                // $scope.lenguajes = data;
                $scope.users = data;
            }).error(function(err){
                alert('Err: ',err);
            });
    }
    $scope.allusers();

    $scope.borrarTask = function(id){
        $http.delete('/deletetask/'+id)
            .success(function(data){
                // $scope.lenguajes = data;
                if(data=='borrado')
                    $scope.alltasks();
            }).error(function(err){
                alert('Err: ',err);
            });
    }




    $scope.newTask = function(){
        $scope.goNewTask = true;
        $scope.goNewUser = false;
    } 

    $scope.cancelarNewTask = function(){
        $scope.formTask = {};
        $scope.goNewTask = false;
    }

    $scope.guardarNewTask = function(){
        $http.post('/save_task', $scope.formTask)
            .success(function(data){
                if(data == 'guardado')
                    $scope.alltasks();
            }).error(function(err){
                alert('Err: ',err);
            });

        $scope.formTask = {};
        $scope.goNewTask = false;
    }
    /***********************************************
    *
    *    USERS
    *
    ************************************************/
    $scope.newUser = function(){
        $scope.goNewUser = true;
        $scope.goNewTask = false;
    }

    $scope.cancelarNewUser = function(){
        $scope.goNewUser = false;
    }

    $scope.guardarNewUser = function(){
        $http.post('/save_user', $scope.formUser)
            .success(function(data){
                if(data == 'guardado')
                    $scope.allusers();
            }).error(function(err){
                alert('Err: ',err);
            });

        $scope.formUser = {};
        $scope.goNewUser = false;
    }

    /***********************************************
    *
    *    ASIGNAR TAREAS
    *
    ************************************************/
    $scope.asignarTarea = function(){

        if(markedTasks.length > 0){
            // console.log($scope.selectUser.user.nombre);
            // console.log(markedTasks.length);

            var tasks_ids = [];
            for(i in markedTasks){
                // tasks_ids.push(markedTasks[i]._id);
                var params = {
                    usuario_id: $scope.selectUser.user._id,
                    task_id: markedTasks[i]._id
                };

                $http.post('/asignartareas',params)
                    .success(function(data){
                        if(data == 'asignada')
                            $scope.alltasks();
                            $scope.alltasksassigned();
                    }).error(function(err){
                        alert('Err: ',err);
                    });
            }
            // console.log(tasks_ids);

            // var params = [{
            //     usuario_id: $scope.selectUser.user._id,
            //     task_id: tasks_ids
            // }];

            // $http.post('/asignartareas',params)
            //     .success(function(data){
            //         // console.log(data);
            //     }).error(function(err){
            //         alert('Err: ',err);
            //     });

        }
    }

    $scope.marcarTask = function(id, isChecked) {
        var items = $scope.tasks;
        if (isChecked == true){
            for(item in items){
                //console.log(items[item]._id);
                if(items[item]._id == id)
                    markedTasks.push(items[item]);
            }
        }else{
            for(x in markedTasks){
                if(markedTasks[x]._id == id){
                    markedTasks.splice(items[item],1);
                }
            }
        }
    };

    
});