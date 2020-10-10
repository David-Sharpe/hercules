import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, Checkbox, TextField } from '@material-ui/core';
import axios from 'axios';

class ResistanceWorkoutGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workout: this.makeData(),
            defaultValue: "2019-05-12",
            checkedRows: []
        };
    }

    currentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const dayOfMonth = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getVarDate()}` 
        return `${year}-${month}-${dayOfMonth}`;
    };

    componentDidMount = async () => {
        try{
            const workout = (await axios.get('http://localhost:8080/workouts/123', {headers: {'Content-Type': 'application/json'}})).data;
            console.log('retrieved workout: ', workout);
            this.setState({ workout });
        } catch (err) {
            console.error(err);
        }
    };

    makeData = () => {
        return {
            id: 123,
            name: 'First Workout',
            exercises: [
                {name: 'Bench Press', weight: 185, units: 'lbs', sets: 3, reps: 10},
                {name: 'Squat', weight: 305, units: 'lbs', sets: 5, reps: 5},
                {name: 'Overhead', weight: 145, units: 'lbs', sets: 5, reps: 5},
                {name: 'Deadlift', weight: 275, units: 'lbs', sets: 1, reps: 5}
        ]};
    };

    addButtonClick = (event) => {
        event.preventDefault();
        const workout = this.state.workout;
        console.log('Pre workout: ', workout);
        workout.exercises.push({});
        console.log('Post workout: ', workout);
        this.setState({workout});
        axios.put(`http://localhost:8080/workouts/${ workout.id }`, workout, {headers: {'Content-Type': 'Application/json'}} );
    };

    deleteButtonClick = (event) => {
       let checkedRows = this.state.checkedRows;
       let workout = this.state.workout;
       checkedRows.map((checkedRow) => {
           delete workout[checkedRow];
       });
       checkedRows = [];
       this.setState({workout, checkedRows});
    };

    checkClicked = (event) => {
        event.preventDefault();
        const checkedRows = this.state.checkedRows;
        checkedRows.push(event.target.value);
        this.setState({
            checkedRows
        });
    };

    updateExercise = (event) => {
        event.preventDefault();
        console.log('event.target: ', event.target);
        const value = event.target.value;
        const fieldName = event.target.name;
        this.setState((prevState) => {
            console.log('update field: ', fieldName);
            console.log('with value: ', value);
            prevState.workout.exercises[0][fieldName] = value;
            return {
                workout: prevState.workout
            };
        });
    }

    render() {
        return (
            <div>
                <Paper>
                    <Grid>
                        <h2>Hello from the grid</h2>
                        <TextField type='date'
                            label='Date'
                            defaultValue={this.state.defaultValue}>
                        </TextField>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Exercise</TableCell>
                                    <TableCell>Weight</TableCell>
                                    <TableCell>Units</TableCell>
                                    <TableCell>Sets</TableCell>
                                    <TableCell>Reps</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.workout.exercises.map((exercise, index) => {
                                    return (
                                        <TableRow id={index}>
                                            <TableCell>
                                                <Checkbox onChange={this.checkClicked} value={index.toString()} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={exercise.name} name='name' onChange={this.updateExercise}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField type='number' min='1' value={exercise.weight}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={exercise.units}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField type='number' min='1' defaultValue={exercise.sets}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField type='number' min='1' defaultValue={exercise.reps}></TextField>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) }
                            </TableBody>
                        </Table>
                        <Button onClick={this.addButtonClick}>Add</Button>

                        <Button onClick={this.deleteButtonClick}>Delete</Button>
                </Grid>
            </Paper>
        </div>
    );
  }
}

export default ResistanceWorkoutGrid;
