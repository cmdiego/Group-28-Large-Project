import React, {Component} from 'react';
import SearchCard from './SearchCard';
import './Search.css';
const axios = require('axios');


const backButtonProcess = async event =>
{
    event.preventDefault();
    window.location.href = '/HomePage';
}


class SearchTest extends Component {
	state= {
		everything: [
			
		]
	}
	
	async componentDidMount() {
		const res = await axios.get('http://localhost:5000/auth/getCourse', { headers: {Authorization: localStorage.getItem('jwtToken')}});
		const _Courses = await res.data.courses;
		console.log("course: " + _Courses[0]);
		var tutorHolder = [];
		for (let i = 0; i < _Courses.length; i++)
		{
			console.log("hello");
			const tutorID = [];
			const tutorInfo = [];
			const tutorAvail = [];
			var course = _Courses[i];
			console.log("Course" + course);
			await axios.post('http://localhost:5000/auth/checkUserTutorCourse', {course}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
			.then(function(data) {
				const  tut  = data.data;
				const TutorLength = tut.length;
				console.log("tutorLength: " + tut);
				let tempID = [];
				for (let j = 0; j < TutorLength; j++)
				{
					tempID[i] = tut.user;
					console.log(tempID[i]);
				}
				tutorID.push(tempID);
			})
			.catch(err => {
				console.log("Error in retrieving list of Tutor IDs: " + err);
			})
			console.log("heyo" + tutorID);
			
			const tutorLength = tutorID.length;
			let tempTutor = [];
			for (let j = 0; j < tutorLength; j++)
			{
				let tempID = tutorID[j];
				await axios.post('http://localhost:5000/auth/getTutorInfo', {tempID}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
				.then(function(other) {
					const tutInfo = other.data;
					tempTutor[j] = tutInfo;
				})
				.catch(err => {
					console.log("Error in returning list of tutorInformation: " + err);
				})
			}
			
			for (let j = 0; j < tempTutor.length; j++)
			{
				tutorInfo[j] = tempTutor[j];
			}
			
			let tempAvail = [];
			for (let j = 0; j < tutorLength; j++)
			{
				let tempID = tutorID[j];
				await axios.post('http://localhost:5000/auth/getTutorAvailability', {tempID}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
				.then(function(anotha) {
					const dt = anotha.data;
					tempAvail[i] = dt;
				})
				.catch(err => {
					console.log("Error in returning list of tutorAvail: " + err);
				})
			}
			
			for (let j = 0; j < tempAvail.length; j++)
			{
				tutorAvail[j] = tempAvail[j];
			}
			
			for (let j = 0; j < tutorLength; j++)
			{
				for (let k = 0; k <= tempAvail.length; k++)
				{
					var obj = {
						Tutor: {
							firstName: tutorInfo[j].firstName,
							lastName: tutorInfo[j].lastName, 
							email: tutorInfo[j].email,
							tutorID: tutorID[j],
						},
						Date: new Date(tutorAvail[j].date[k]),
						Course: _Courses[i],
					}
					tutorHolder.push(obj);
				}
			}
		}
		console.log("end: " + tutorHolder);
		this.setState({everything : tutorHolder})
	}
	
	render() {
		return (
			<div id="searchDisplay">
				<button id="backButton" onClick={backButtonProcess} >Back</button>
				<br/>
				{this.state.everything.map(searchInfo => (
					<SearchCard info={searchInfo} />
				))}
				
				
			</div>
		);
	}
}

export default SearchTest;