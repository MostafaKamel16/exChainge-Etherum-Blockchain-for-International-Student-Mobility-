import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Grow from '@mui/material/Grow';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import DangerousIcon from '@mui/icons-material/Dangerous';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

const QontoConnector = styled(StepConnector)(({ theme }) => ({


  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'rgb(53, 110, 255)'//'#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'rgb(53, 110, 255)',//'#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: 'rgb(53, 110, 255)',//'#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: 'rgb(53, 110, 255)',//'#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
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
};

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
    backgroundImage:'linear-gradient( 136deg, #07565e 0%, #097976 50%, #00d4ff 100%)',
      //'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const checkFinal = () =>{
    if(props.icon==3 && props.completed)
      return <DoneAllIcon/>
    else
      return <DangerousIcon/>
  }
  const icons = {
    1: <HourglassDisabledIcon />,
    2: <AutorenewIcon />,
    3:  (props.icon==3 && props.completed)?<DoneAllIcon/>:<DangerousIcon></DangerousIcon> ,
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

const Timeline = (props) => {
  const [activeStep, setActiveStep] = React.useState(props.step);
  const [completed, setCompleted] = React.useState({});
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  useEffect( () =>{
    
  }, [activeStep])

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const isStepOptional = (step) => {
    return step === 1;
  };


  return (
    <Stack sx={{ width: '100%' }} spacing={4}>

      {//<Stepper alternativeLabel activeStep={props.step} connector={<ColorlibConnector />}>
      }
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {props.items.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          return(
            <Grow in={true} {...(true ? { timeout: 500*index } : {})}>
            <Step key={label} {...stepProps}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
            </Grow>
          )
        })}
      </Stepper>

      {/*<Stepper  alternativeLabel nonLinear activeStep={activeStep} connector={<QontoConnector />}>
        {props.items.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
        props.items.map((label, index) => {
          const handleSteps = (e)=>{
            setActiveStep(index)
            e.preventDefault()
          }
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          return(
            <Step key={label} {...stepProps}>              
              <StepButton  {...labelProps} color="inherit" onClick={handleSteps}>
                {label}
              </StepButton>
            </Step>
          )
          
        })
      </Stepper>
      */}
    </Stack>
  );
}

export default Timeline;