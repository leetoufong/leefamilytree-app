import React, {useEffect, useState} from 'react';
import Tree from './Tree';
import Search from './Search';

import './App.scss';

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

	// Parent Component
	return (
		<div className="App">
			<header className="app-header">
                <h1>Lee Family Tree</h1>
                <Search />
            </header>

			<Tree data={data} />

			<footer className="app-footer">
                <small>v0.1 </small>
                <small>Last updated on 01/11/2022</small>
            </footer>
		</div>
	);

}
