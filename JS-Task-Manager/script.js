var addtaskbtn = document.getElementById('add-task-btn')
var taskinput = document.getElementById('task-input')
var tasklist = document.getElementById('task-list')


loadTasks()

function addtask() {

     var task = taskinput.value.trim();

     if (task) {
          createTaskElement(task);

          taskinput.value = '';

          saveTask();

          updateTaskCounter();

     } else {
          alert('Please Add a task !')
     }
}


// Enter Button
addtaskbtn.addEventListener('click', function (e) {
     e.preventDefault();
     addtask();
});

taskinput.addEventListener('keydown', function (e) {
     if (e.key === 'Enter') {
          e.preventDefault();
          addtask();
     }
});


// old function createTaskElement(task){

//      var listitem = document.createElement('li');

//      listitem.textContent = task

//      var deletebutton=document.createElement('button');
//      deletebutton.textContent='delete'
//      deletebutton.className='deleteTask'

//      listitem.appendChild(deletebutton);

//      var editbutton = document.createElement('button')
//      editbutton.textContent= 'edit'
//      editbutton.className='EditTask'

//      listitem.appendChild(editbutton);

//      tasklist.appendChild(listitem);



//      deletebutton.addEventListener('click', function(){
//           tasklist.removeChild(listitem);
//           saveTask()
//      })


//      editbutton.addEventListener('click', function(){
//     var newtask = prompt("Edit your task:", listitem.firstChild.textContent);
//     if(newtask !== null && newtask.trim() !== ""){
//         listitem.firstChild.textContent = newtask;
//         saveTask();
//     }

// });

// }


function createTaskElement(task, completed) {

     // Create a new <li> element (a task row)
     var listitem = document.createElement('li');

     // Create checkbox
     var checkbox = document.createElement('input');
     checkbox.type = 'checkbox'

     // restore checkbox state from storage
     checkbox.checked = completed;

     // if task was completed before refresh
     // add strike-through again
     if (completed) {
          listitem.style.textDecoration = 'line-through';
     }


     // Add checkbox to li
     listitem.appendChild(checkbox);
     // Put task text
     listitem.appendChild(document.createTextNode(task));



     // Create delete button
     var deletebutton = document.createElement('button');
     // Text inside button → "delete"
     deletebutton.textContent = 'delete'
     deletebutton.className = 'deleteTask'

     // Put delete button inside the <li>
     // <li>Gym [delete]</li>
     listitem.appendChild(deletebutton);


     // Create edit button
     var editbutton = document.createElement('button')
     editbutton.textContent = 'edit'
     // CSS class
     editbutton.className = 'EditTask'

     // Put edit button inside the <li>
     // <li>Gym [delete] [edit]</li>
     listitem.appendChild(editbutton);


     // Add the <li> to the task list <ul>
     // Now the task appears on the page
     tasklist.appendChild(listitem);



     // CHECKBOX LOGIC
     checkbox.addEventListener('change', function () {

          if (checkbox.checked) {
               listitem.style.textDecoration = 'line-through';
          } else {
               listitem.style.textDecoration = 'none';
          }

          saveTask();
          updateTaskCounter();

     });

     // DELETE BUTTON LOGIC
     // When delete button is clicked
     deletebutton.addEventListener('click', function () {

          // Remove this task from the list
          tasklist.removeChild(listitem);

          // Save the updated list to localStorage
          saveTask()

          updateTaskCounter();
     })


     // EDIT BUTTON LOGIC
     // When edit button is clicked
     editbutton.addEventListener('click', function () {

          // Show prompt box with current task text
          var newtask = prompt("Edit your task:", listitem.childNodes[1].textContent);
          listitem.childNodes[1].textContent = newtask;

          // Check if user typed something valid
          if (newtask !== null && newtask.trim() !== "") {

               // Replace old task text with new text
               listitem.childNodes[1].textContent = newtask;

               // Save updated task list
               saveTask();
          }

     });

}

function updateTaskCounter() {

     var tasks = document.querySelectorAll("li");
     var total = tasks.length;

     var completed = 0;

     tasks.forEach(function (task) {

          var checkbox = task.querySelector("input[type='checkbox']");

          if (checkbox.checked) {
               completed++;
          }

     });

     var pending = total - completed;

     document.getElementById("totalTasks").textContent = total;
     document.getElementById("completedTasks").textContent = completed;
     document.getElementById("pendingTasks").textContent = pending;

}


function saveTask() {

     // Create an empty array to store all tasks
     var tasks = [];

     // Loop through every <li> task in the list
     tasklist.querySelectorAll('li').forEach(function (item) {

          // Get the checkbox inside the task
          var checkbox = item.querySelector('input');

          // Get the task text
          // childNodes[1] = the text node after checkbox
          var text = item.childNodes[1].textContent.trim();

          // Push an object into the array
          // This stores BOTH text and checkbox state
          tasks.push({
               text: text,
               completed: checkbox.checked
          });

     });

     // Save the array to localStorage
     localStorage.setItem('task', JSON.stringify(tasks));
}

function loadTasks() {

     // Get saved tasks from localStorage
     var tasks = JSON.parse(localStorage.getItem('task')) || [];

     // Loop through each saved task
     tasks.forEach(function (task) {

          // Create the task again
          // Send both text and checkbox state
          createTaskElement(task.text, task.completed);

           updateTaskCounter();

     });

}


function showAllTasks() {

    var tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(function(task) {
        task.style.display = "block";
    });

}

function showCompletedTasks() {

    var tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(function(task) {

        var checkbox = task.querySelector("input[type='checkbox']");

        if (checkbox.checked) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }

    });

}


function showPendingTasks() {

    var tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(function(task) {

        var checkbox = task.querySelector("input[type='checkbox']");

        if (!checkbox.checked) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }

    });

}

function clearCompletedTasks() {

    var tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(function(task) {

        var checkbox = task.querySelector("input[type='checkbox']");

        if (checkbox.checked) {
            task.remove();
        }

    });

    saveTask();
    updateTaskCounter();

}

// CONNECT BUTTONS HERE
document.getElementById("showAll").addEventListener("click", showAllTasks);
document.getElementById("showCompleted").addEventListener("click", showCompletedTasks);
document.getElementById("showPending").addEventListener("click", showPendingTasks);
document.getElementById("clearCompleted").addEventListener("click", clearCompletedTasks);



//solo code
//ater clerar comple click >all pona not working ellam revove aahi