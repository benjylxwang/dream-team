import { Typography } from "@mui/material";


const Home = (props) => {
    let { goats, ...others } = props;


    return (
        <div>
            <Typography variant="h3" color="white">{goats ? "GOATS" : "Coming soon..."}</Typography>
        </div>
    )
};


export default Home;