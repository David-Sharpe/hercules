import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, Checkbox, TextField } from '@material-ui/core';

class ResistanceWorkoutGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workout: this.makeData(),
            // selectedDate: this.currentDate(),
            checkedRows: []
        };
    }

    currentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const dayOfMonth = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getVarDate()}` 
        return `${year}-${month}-${dayOfMonth}`;
    }

    makeData = () => {
        return [
            {name: 'Bench Press', weight: '185 lbs', sets: 3, reps: 10},
            {name: 'Squat', weight: '305 lbs', sets: 5, reps: 5},
            {name: 'Overhead', weight: '145 lbs', sets: 5, reps: 5},
            {name: 'Deadlift', weight: '275 lbs', sets: 1, reps: 5}
        ];
    };

    addButtonClick = (event) => {
        event.preventDefault();
        const workout = this.state.workout;
        workout.push({});
        this.setState({workout});
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

    render() {
        return (
            <div>
                <Grid>
                    <Paper>
                        <h2>Hello from the grid</h2>
                        {/* <TextField type='date'
                            label='Date'
                            defaultValue={this.state.selectedDate}>
                        </TextField> */}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Exercise</TableCell>
                                    <TableCell>Weight</TableCell>
                                    <TableCell>Sets</TableCell>
                                    <TableCell>Reps</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.workout.map((exercise, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Checkbox onChange={this.checkClicked} value={index.toString()} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={exercise.name}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={exercise.weight}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField type='number' defaultValue={exercise.sets}></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField type='number' defaultValue={exercise.reps}></TextField>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) }
                            </TableBody>
                        </Table>
                        <Button onClick={this.addButtonClick}>Add</Button>
                        <Button onClick={this.deleteButtonClick}>Delete</Button>
                    </Paper>            
            </Grid>
        </div>
    );
  }
}

export default ResistanceWorkoutGrid;
