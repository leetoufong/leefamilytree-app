import React from 'react';
import {ReactComponent as MaleIcon} from './male.svg';
import {ReactComponent as FemaleIcon} from './female.svg';

export default function Tree(props) {
    const {data} = props;

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
