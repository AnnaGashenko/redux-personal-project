// Core
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

// Actions
import { taskActions } from '../../bus/tasks/actions';
import { bindActionCreators } from "redux";
import { uiActions } from "../../bus/ui/actions";

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

export default class Task extends PureComponent {

    state = {
        comment: this.props.message,
        editTask: false
    };

    _removeTask = () => {
        this.props.actions.removeTaskAsync(this.props.id);
    };

    _editTask = () => {
        const { editTask } = this.state;
        this.setState({
            editTask: !editTask
        })
    };

    _handleInputChange = ({ target: { value }}) => {
        this.setState({
            comment: value
        });
    };

    _handleKeyPress = (event) => {
        const { editTask, comment } = this.state;
        const { completed, id, favorite} = this.props;
        if(event.keyCode === 27) {
            this.setState({
                editTask: false,
                comment: this.props.message
            })
        } else if( event.key === 'Enter') {
            if(editTask === true) {
                this.props.actions.updateTaskAsync(
                    [{ id, completed, favorite, message : comment }]
                );
            }
            this.setState({
                editTask: false
            })
        }
    };

    _updateFavoriteTask = () => {
        const { id, message, completed, favorite, actions } = this.props;

        actions.updateTaskAsync([{ id, message, completed, favorite: !favorite }]);
    };

    _updateCompletedTask = () => {
        const { id, message, completed, favorite, actions, ui } = this.props;

        actions.updateTaskAsync([{ id, message, completed: !completed, favorite }]);

        if(ui.get('allCompleted')) {
            actions.allCompletedTask(false);
        }
    };

    render () {
        const { message, completed, favorite } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        inlineBlock
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._updateCompletedTask }
                    />
                    {
                        this.state.editTask
                            ?   <input
                                value= { this.state.comment }
                                type="text"
                                maxLength="50"
                                onChange = { this._handleInputChange }
                                onKeyDown = { this._handleKeyPress }
                                autoFocus
                            />
                            :
                            <input disabled type = 'text' value = { message } />
                    }
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._updateFavoriteTask }
                    />
                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        // checked = { this.state.editTask }
                        onClick = { this._editTask }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
