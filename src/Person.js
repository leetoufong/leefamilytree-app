import react from 'react';

export default function Person(props) {
	const {person} = props;

	return (
		<div>
			<button>{person.firstName} {person.lastName}</button>
		</div>
	)
}
