import React from "react";
import Card from '@mui/material/Card';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { CardContent, CardHeader, CardMedia, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import IosShareIcon from '@mui/icons-material/IosShare';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StepLabel from '@mui/material/StepLabel';
import Icon from '@material-ui/core/Icon';
import exchaingeLogo from "../img/exchainge_logo.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardStyle: {
        marginTop: '2rem',
        textAlign: 'center',
        padding: '1.5rem',
        color: 'inherit',
        display: 'block',
        width: '85%',
        transitionDuration: 'color 0.15s ease',
        position: 'relative',
    },
    cardHeader: {
        width: 'auto',
        textAlign: 'center',
        padding: '5px',
    },
    cardFooter: {
        width: '80%',
        textAlign: 'center',
        padding: '1.25rem',
        border: '0',
        borderRadius: '6px',
        justifyContent: 'center !important',
    },
    cardRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    cardButtons: {
        display: "flex",
        justifyContent: "center",
        margin: "2rem"
    }
}));


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, #07565e 0%, #097976 50%, #00d4ff 100%)',
            //'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, #07565e 0%, #097976 50%, #00d4ff 100%)',
            //'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, #07565e 0%, #097976 50%, #00d4ff 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage: 'linear-gradient( 136deg, #07565e 0%, #097976 50%, #00d4ff 100%)',
        //'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <IosShareIcon />,
        2: <DriveFileRenameOutlineIcon />,
        3: <MarkEmailReadIcon />,
        4: <DoneAllIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const TranscriptStatus = (props) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const classes = useStyles();

    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    const data = [
        [{
            pic: '/letter-2742646_640.jpg',
            title: 'Hash the transcripts',
            body: 'The first step of the process begins when you choose a transcript to send, the system then takes the transcript and hashes'
        }, {
            pic: '/upload1.svg',
            title: 'Upload the transcripts',
            body: 'The hash of the transcripts is then sent to the blockchain while the original transcript is sent over to the university of your choice'
        }],
        [{
            pic: '/license-icon-2793454_640.png',
            title: 'Smart Contracts',
            body: 'These digital contracts ensure that your transcript hashes are stored in a very meticulous and safe fashion on the blockchain'
        }, {
            pic: '/pascal-bernardon-zt0HWquGXlQ-unsplash.jpg',
            title: 'Writing to the Blockchain',
            body: 'Once the interaction with the smart contract is successful, the transaction is written to the blockchain where it cannot be modified anymore'
        }],
        [{
            pic: '/paper-5419824_640.jpg',
            title: 'Paperless',
            body: 'The actual process of sending out the transcript to a foreign university now becomes 100% paperless'
        }, {
            pic: '/pexels-torsten-dettlaff-193003.jpg',
            title: 'Recieved',
            body: 'The foreign university gets the transcript in its system immediately after the transcript hash is stored in the blockchain'
        }],
        [{
            pic: '/blockchain-2853046_640.jpg',
            title: 'Trusted',
            body: 'The foreign exchange coordinator does not need to be worried about tampering of the transcripts anymore as the system ensures integrity of the transcript'
        }, {
            pic: '/stamp-1415724_640.jpg',
            title: 'Easily Validated',
            body: 'A received transcript can be validated easily by simply hashing it again and using the contract to see if the hash exists in on the blockchain'
        }]
    ];
    const isStepOptional = (step) => {
        return step === 1;
    };


    const showFooter = ( index) => (
        <div style={{ display: activeStep === index ? '' : 'none' }}>
            <Grid container spacing="1" alignItems="center" className={classes.cardRow + " " + classes.cardButtons} >
                <Grow key={index} in={true}>
                    <Card sx={{ width: '35%', marginRight: '2rem', height: '45vh'  }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={data[index][0].pic}
                        />
                        <CardContent collapseable >
                            <Typography gutterBottom variant="h5" component="div">
                                {data[index][0].title}
                            </Typography>
                            <Typography align="justify" variant="body2" color="text.secondary">
                                {data[index][0].body}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grow>
                <Grow key={index+1} in={true} >
                    <Card sx={{ width: '35%', marginLeft: '2rem', height: '45vh' }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={data[index][1].pic}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data[index][1].title}
                            </Typography>
                            <Typography align="justify" variant="body2" color="text.secondary">
                                {data[index][1].body}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grow>

            </Grid>
        </div>
    );


    const timeline = () => (
        <Card variant="outlined" className={classes.cardStyle}>
            <CardHeader className={classes.cardHeader} var title={
                <span style={{ display: 'inline-block' }}>
                    How
                    <Icon style={{ paddingLeft: 15, paddingRight: 15 }}>
                        <img alt="" src={exchaingeLogo} style={{ paddingUp: 100 }} />
                    </Icon>
                    works
                </span>
            } />
            <CardContent >
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {props.items.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        return (
                            <Step onClick={handleStep(index)} key={label} {...stepProps}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </CardContent>
            <br />
            <cardFooter> {showFooter(activeStep)} </cardFooter>
        </Card>
    );

    return (
        <React.Fragment>
            <center>
                {timeline()}
            </center></React.Fragment>
    );
};

export default TranscriptStatus;