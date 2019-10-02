// Core
import React, { Component, createRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';

// Instruments
import Styles from './styles.m.css';
import { composer } from '../../bus/forms/shapes';

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { taskActions } from '../../bus/tasks/actions';
import { uiActions } from '../../bus/ui/actions';

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        ui : state.ui
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...taskActions, ...uiActions }, dispatch),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)

export default class Scheduler extends Component {
    formikForm = createRef();

    _submitForm = (formData, actions) => {
        this._createTask(formData);
        actions.resetForm();
    };

    _createTask = ({ comment }) => {
        if (!comment) {
            return null;
        }

        this.props.actions.createTaskAsync(comment);
    };

    _submitFormOnEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            this.formikForm.current.submitForm();
        }
    };

    _sortingTasks = (a, b) => {
        if (a.get('completed') > b.get('completed')) {
            return 1;
        }
        if (a.get('completed') < b.get('completed')) {
            return -1;
        }
        if (a.get('favorite') < b.get('favorite')) {
            return 1;
        }
        if (a.get('favorite') > b.get('favorite')) {
            return -1;
        }
        return 0;
    };

    _handleInputChange = ({ target: { value }}) => {
        this.props.actions.searchTask(value);
    };

    _updateCompletedTask = () => {
        const { tasks, actions } = this.props;

        const data = tasks.map((task) => (
            {
                "message": task.get('message'),
                "id": task.get('id'),
                "completed": true,
                "favorite": task.get('favorite'),
            }
        ));

        actions.allCompletedTask(true);
        actions.completedAllTaskAsync(data.toJS());
    };

    componentDidMount () {
        const { actions } = this.props;
        actions.fetchTasksAsync();
    }

    render () {
        const { tasks, ui } = this.props;
        const valueSearch = ui.get('valueSearch');
        const allCompleted = ui.get('allCompleted');
        const todoList = tasks
            .filter(task => {
                return task.get('message').toLowerCase().includes(valueSearch.toLowerCase())
            })
            .sort(this._sortingTasks)
            .map((task) => (
            <Task
                completed = { task.get('completed') }
                favorite = {  task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            onChange = { this._handleInputChange }
                        />
                    </header>
                    <section>
                        <Formik
                            initialValues = { composer.shape }
                            ref = { this.formikForm }
                            render = { () => {
                                return (
                                    <Form>
                                        <Field
                                            component = 'input'
                                            name = 'comment'
                                            maxLength = { 50 }
                                            className = { Styles.createTask }
                                            placeholder = 'Описание моей новой задачи'
                                            type = 'text'
                                            onKeyPress = { this._submitFormOnEnter }
                                        />
                                        <button type = 'submit'>Добавить задачу</button>
                                    </Form>
                                );
                            } }
                            validationSchema = { composer.schema }
                            onSubmit = { this._submitForm }
                        />
                        <div className = { Styles.overlay }>
                            <FlipMove>{todoList}</FlipMove>
                        </div>
                    </section>

                    <footer>
                        <Checkbox
                            color1 = '#363636'
                            color2 = '#fff'
                            checked = { allCompleted }
                            onClick = { this._updateCompletedTask }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
