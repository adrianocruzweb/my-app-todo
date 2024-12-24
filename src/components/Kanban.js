// src/components/Kanban.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Kanban.css'; // Importa o CSS do Kanban

const Kanban = () => {
    const [tasks, setTasks] = useState({
        todo: [{ id: '1', content: 'Tarefa 1' }],
        inProgress: [{ id: '2', content: 'Tarefa 2' }],
        test: [{ id: '2', content: 'Tarefa 3' }],
        done: [{ id: '3', content: 'Tarefa 4' }],
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceList = result.source.droppableId;
        const destList = result.destination.droppableId;

        if (sourceList !== destList) {
            const sourceTasks = Array.from(tasks[sourceList]);
            const [movedTask] = sourceTasks.splice(result.source.index, 1);
            const destTasks = Array.from(tasks[destList]);
            destTasks.splice(result.destination.index, 0, movedTask);

            setTasks({
                ...tasks,
                [sourceList]: sourceTasks,
                [destList]: destTasks,
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-container">
                {Object.keys(tasks).map((list) => (
                    <Droppable key={list} droppableId={list}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                                <h3>{list.charAt(0).toUpperCase() + list.slice(1)}</h3>
                                {tasks[list].map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="kanban-card">
                                                {task.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Kanban;
