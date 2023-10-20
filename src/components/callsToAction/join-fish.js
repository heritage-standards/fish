import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "gatsby";

const JoinUsButton = () => {
    return (
        <Link to={'become-a-fish-member'}>
            <Button variant="outline-dark" size="lg" className={'my-2'}>
                Become a member of FISH
            </Button>
        </Link>
    );
};

export default JoinUsButton;