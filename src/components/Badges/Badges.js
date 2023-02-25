import React from 'react';
import Badge from 'react-bootstrap/Badge';


const Badges = ({genre}) => {
    const{name}=genre
    return (


        <div>
            <Badge bg="success">
                {name}
            </Badge>{' '}
        </div>
    );
};

export {Badges};