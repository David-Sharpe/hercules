import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, Checkbox, TextField } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { Add, Delete, Edit, NavigateBefore, NavigateNext } from '@material-ui/icons';

const units = Object.freeze([
    Object.freeze({
        label: 'kg',
        value: 'kg'
    }),
    Object.freeze({
        label: 'lb',
        value: 'lbs'
    })
]);

export default class ResistanceWorkoutGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workout: this.makeData(),
            defaultValue: moment().format('YYYY-MM-DD'),
            checkedRows: new Set(), 
            tempExercises: new Map(),
            currentExerciseIndex: 0,
            showExerciseModal: false 
        };
    }

    onUnitChange = (event) => {
        event.preventDefault();
        this.setState({
            units: event.target.value
        });
    };

    closeDialog = (event) => {
        event.preventDefault();
        this.setState({
            currentExerciseIndex: 0
        });
        this.toggleExerciseModal(false);
    };

    saveExercises = (event) => {
        this.updateExercises(event);
        this.closeDialog(event);
    };

    updateExercise = (event) => {
        const selectedExercises = [ ...this.state.checkedRows.values() ];
        console.log('selectedExercises: ', selectedExercises);
        const selectedKey = selectedExercises[this.state.currentExerciseIndex];
        const currentExercise = this.state.tempExercises.get(selectedKey) || {};
        const fieldName = event.target.id;
        currentExercise[fieldName] = event.target.value;
        this.forceUpdate();
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

    makeData = () => ({
            id: 123,
            name: 'First Workout',
            exercises: this.makeExerciseMap()
    });

    makeExerciseMap = () => {
        const exerciseMap = new Map();
        exerciseMap.set(0, {name: 'Bench Press', weight: 185, units: 'lbs', sets: 3, reps: 10});
        exerciseMap.set(1, {name: 'Squat', weight: 305, units: 'lbs', sets: 5, reps: 5});
        exerciseMap.set(2, {name: 'Overhead', weight: 145, units: 'lbs', sets: 5, reps: 5});
        exerciseMap.set(3, {name: 'Deadlift', weight: 275, units: 'lbs', sets: 1, reps: 5});
        return exerciseMap;
    };

    addButtonClick = (event) => {
        event.preventDefault();

        this.toggleExerciseModal(!this.state.showExerciseModal);
        const tempExercises = new Map();
        for(const key of this.state.checkedRows) {
            tempExercises.set(key, JSON.parse(JSON.stringify(this.state.workout.exercises.get(key))));
        }
        this.setState({
            tempExercises
        });
        // const workout = this.state.workout;
        // console.log('Pre workout: ', workout);
        // workout.exercises.push({});
        // console.log('Post workout: ', workout);
        // this.setState({workout});
        // axios.put(`http://localhost:8080/workouts/${ workout.id }`, workout, {headers: {'Content-Type': 'Application/json'}} );
    };

    toggleExerciseModal = showExerciseModal => this.setState({ showExerciseModal });

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
        console.log('event: ', event.target.checked);
        const target = event.target;
        const key = Number.parseInt(target.value);
        this.setState((prevState) => {
            if (target.checked) {
                prevState.checkedRows.add(key);
            } else {
                prevState.checkedRows.delete(key);
            }
            return {
                checkedRows: prevState.checkedRows
            };
        });
    };

    updateExercises = (event) => {
        console.log('updateExercises event: ', event);
        this.setState((prevState) => {
            console.log('prevState: ', prevState);
            for(const key of prevState.checkedRows) {
                console.log('row: ', key);
                const value = this.state.tempExercises.get(key);
                console.log('value: ', value);
                prevState.workout.exercises.set(key, value);
            }
            return {
                workout: prevState.workout
            };
        });
    }

    renderModal = () => {
        const selectedExercises = [ ...this.state.checkedRows.values() ];
        const currentExerciseKey = selectedExercises[this.state.currentExerciseIndex];
        const currentExercise = this.state.tempExercises.get(currentExerciseKey) || {};
        return (
            <Dialog open={ this.state.showExerciseModal } onClose={ this.closeDialog }>
                <DialogTitle>Fill in exercise details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Exercise {this.state.currentExerciseIndex + 1} of {this.state.checkedRows.size}</DialogContentText>
                    <div>
                        <TextField id="name" type="Text" label="Exercise" value={ currentExercise.name } onChange={ this.updateExercise }>Exercise</TextField>
                    </div>
                    <div>
                        <TextField id="weight" type="Number" min="1" steps="1" label="Weight" value={currentExercise.weight } onChange={ this.updateExercise }></TextField>
                        <TextField id="units" select label="Units" value={ currentExercise.units } onChange={this.onUnitChange}>
                                {units.map((unit) => (
                                    <MenuItem key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField id="sets" type="Number" min="1" steps="1" label="Sets" value={ currentExercise.sets } onChange={ this.updateExercise }></TextField>
                    </div>
                    <div>
                        <TextField id="reps" type="Number" min="1" steps="1" label="Reps" value={ currentExercise.reps } onChange={ this.updateExercise }></TextField>
                    </div>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick = {() => { this.setState(prevState => ({
                        currentExerciseIndex: Math.max(0, prevState.currentExerciseIndex - 1)
                    }));}}>
                        <NavigateBefore />
                    </IconButton>
                    <Button color="secondary" onClick={ this.closeDialog }>Cancel</Button>
                    <Button color="primary" onClick={ this.saveExercises }>Done</Button>
                    <IconButton onClick = {() => { console.log('size: ', selectedExercises.length); this.setState(prevState => ({
                        currentExerciseIndex: Math.min(selectedExercises.length - 1, prevState.currentExerciseIndex + 1)
                    }));}}>
                        <NavigateNext />
                    </IconButton>
                </DialogActions>
            </Dialog>
        )
    }

    render = () => (
        <div>
            { this.renderModal() }
            <Paper>
                <Grid>
                    <h2>Hello from the grid</h2>
                    <TextField type='date'
                        label='Date'
                        defaultValue={ this.state.defaultValue }>
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
                            { Array.from(this.state.workout.exercises.entries()).map(([key, exercise]) => {
                                return (
                                    <TableRow id={ key }>
                                        <TableCell>
                                            <Checkbox onChange={ this.checkClicked } value={ key.toString() } />
                                        </TableCell>
                                        <TableCell>{ exercise.name }</TableCell>
                                        <TableCell>{ exercise.weight }</TableCell>
                                        <TableCell>{ exercise.units }</TableCell>
                                            <TableCell>{ exercise.sets }</TableCell>
                                            <TableCell>{ exercise.reps }</TableCell>
                                    </TableRow>
                                ); }) }
                        </TableBody>
                    </Table>
                    <IconButton onClick={this.addButtonClick}>
                        {this.state.checkedRows.size > 0 ? (<Edit />) : (<Add />) }
                    </IconButton>

                    <IconButton disabled={ this.state.checkedRows.size <= 0 } onClick={this.deleteButtonClick}>
                        <Delete />
                    </IconButton>
                </Grid>
            </Paper>
        </div>
    );
}

ResistanceWorkoutGrid.propTypes = {

};

ResistanceWorkoutGrid.defaultProps = {

};
