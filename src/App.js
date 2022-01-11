import React, {useEffect, useState} from 'react';
import {ReactComponent as MaleIcon} from './male.svg';
import {ReactComponent as FemaleIcon} from './female.svg';
import './App.css';

export default function App() {
	const [data, setData] = useState([]);
	const [appLoading, setAppLoading] = useState(false);
    const [appError, setAppError] = useState(false);

	// Queue up the data
	useEffect(() => {
		// Asynchronously fetch data
		const fetchData = async () => {
			setAppLoading(true);

			try {
				const response = await fetch('./json/familytree.json');
				const responseData = await response.json();

				setData(responseData.tree);
				setAppLoading(false);
			} catch (error) {
                setAppLoading(false);
                setAppError(true);

				console.log(error);
			}
		};

		fetchData();
	}, []);

	// Recursive Component
	const Tree = ({data}) => {
		return (
			<div className="tree">
				{data.map((person, index) => (
					<div className="family" key={index}>
						<div className="parent">
							<button className="person">
                                {person.firstName}
                                <i className="gender-icon">{person.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</i>
                            </button>
						</div>
						{person.children && person.children.length > 0 ? (
							<div className="children">
								<Tree data={person.children} />
							</div>
						) : (
							''
						)}
					</div>
				))}
			</div>
		)
	}

    function handleSearch(event) {
        event.preventDefault();

        const string = event.target[0].value.toLowerCase();
        const tree = document.querySelector('.tree');
        const stringCheck = tree.innerHTML.toLowerCase().indexOf(string);
        const targets = tree.querySelectorAll('.person');
        let stringMatch = 0;

        if (stringCheck > 0) {
            targets.forEach(element => {
                element.classList.remove('search-found');

                if (element.innerText.toLowerCase().indexOf(string) > -1) {
                    element.classList.add('search-found');
                    stringMatch++;
                }
                
            });
        } else {
            console.log('Did not find:', string);
            targets.forEach(element => {
                element.classList.remove('search-found');
            });

            stringMatch = 0;
        }
    }

	// Parent Component
	return (
		<div className="App">
			<header className="app-header">
                <h1>Lee Family Tree</h1>
                <form onSubmit={(event) => handleSearch(event)}>
                    <input type="text" placeholder="Type a name" />
                    <button type="submit">Search</button>
                </form>
            </header>

			<Tree data={data} />

			<footer className="app-footer">
                <small>v0.1 </small>
                <small>Last updated on 01/11/2022</small>
            </footer>
		</div>
	);

}
