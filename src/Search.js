import React, {useState} from 'react'

export default function Search() {
    const [search, setSearch] = useState('');

    function handleSearch(event) {
        event.preventDefault();

        const string = event.target[0].value.toLowerCase();

        const tree = document.querySelector('.tree');
        const stringCheck = tree.innerHTML.toLowerCase().indexOf(string);
        const targets = tree.querySelectorAll('.person');
        let stringMatch = 0;

        setSearch(string);

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
    
    return (
        <form onSubmit={(event) => handleSearch(event)}>
            <input type="text" placeholder="Type a name" />
            <button type="submit">Search</button>
        </form>
    )
}
