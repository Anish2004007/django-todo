from django.shortcuts import render

tasks = []


def todo_list(request):

    if request.method == "POST":

        action = request.POST.get("action")

        # Add task
        if action == "add":
            task = request.POST.get("task")

            if task:
                tasks.append({
                    "text": task,
                    "completed": False
                })

        # Complete task
        elif action == "complete":
            index = int(request.POST.get("index"))

            if 0 <= index < len(tasks):
                tasks[index]["completed"] = True

        # Delete task
        elif action == "delete":
            index = int(request.POST.get("index"))

            if 0 <= index < len(tasks):
                tasks.pop(index)

        # Edit task
        elif action == "edit":
            index = int(request.POST.get("index"))
            new_task = request.POST.get("task")

            if 0 <= index < len(tasks) and new_task:
                tasks[index]["text"] = new_task

    return render(request, "tasks/todo.html", {"tasks": tasks})