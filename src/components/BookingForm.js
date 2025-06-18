import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FaClock, FaUserCheck, FaCheckCircle, FaTools, FaPhoneAlt, FaHome, FaUser, FaInfoCircle } from 'react-icons/fa';
import io from 'socket.io-client';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
// const Container = styled.div`
//   max-width: 600px;
//   margin:  auto;
//   padding: 2rem;
//   background: #f9f9f9;
//   border-radius: 15px;
//   box-shadow: 10x 5px 15pxblack ;
//   animation: ${fadeIn} 0.5s ease-out;
// `;

const Title = styled.h1`
  color: #2c3e50;
  font-family: 'Savate', sans-serif;  // Fix the font property
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Savate', sans-serif;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  color: #2c3e50;
  font-family: 'Savate', sans-serif;  // Fix the font property
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  transition: all 0.3s;
  color: #2c3e50;
  font-family: 'Savate', sans-serif;  // Fix the font property
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  font-family: 'Savate', sans-serif;  // Fix the font property
  
  &:hover {
    background: black;
    color:white;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StatusContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const StatusTitle = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StatusCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const InfoRow = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: #34495e;
  font-family: 'Savate', sans-serif;
`;

const Timer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
  text-align: center;
  margin: 1rem 0;
  animation: ${pulse} 2s infinite;
`;

const StageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  position: relative;
`;

const StageLine = styled.div`
  position: absolute;
  height: 4px;
  background: #ddd;
  top: 20px;
  left: 10%;
  right: 10%;
  z-index: 1;
`;

const StageLineActive = styled.div`
  position: absolute;
  height: 4px;
  background: #3498db;
  top: 20px;
  left: 10%;
  right: ${props => {
    if (props.status === 'pending') return '10%';
    if (props.status === 'accepted') return '50%';
    return '10%';
  }};
  z-index: 2;
  transition: right 0.5s ease-in-out;
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
`;

const StageIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
    if (props.active) return '#3498db';
    if (props.completed) return '#2ecc71';
    return '#ddd';
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 8px;
  transition: all 0.3s;
`;

const StageLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => (props.active || props.completed) ? '#2c3e50' : '#95a5a6'};
  font-weight: ${props => (props.active || props.completed) ? 'bold' : 'normal'};
`;

const TechnicianCard = styled.div`
  background: #e8f4fc;
  border-left: 4px solid #3498db;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
`;

const CompletionCard = styled.div`
  background: #e8f8ef;
  border-left: 4px solid #2ecc71;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
`;

const NewBookingButton = styled(Button)`
  background: #2ecc71;
  margin-top: 1rem;
  
  &:hover {
    background: #27ae60;
  }
`;

const MainContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormSection = styled.div`
  flex: 1;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: black;
  border-radius: 10px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateX(10px);
    background: #e8f4fc;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  color: black;
  background: #e8f4fc;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-family: 'Savate', sans-serif;
`;

const InfoDescription = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
  font-family: 'Savate', sans-serif;
`;

const socket = io('http://localhost:5000');

const BookingForm = () => {
    const [formdata, setformdata] = useState({
        customerName: '',
        phone: '',
        applianceType: '',
        description: '',
    });
    const [bookingsucess, setbookingsucess] = useState(false);
    const [timer, setTimer] = useState(600);
    const [bookingDetails, setBookingdetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load booking details from localStorage on component mount
    useEffect(() => {
        const savedBooking = localStorage.getItem('currentBooking');
        const lastBookingPhone = localStorage.getItem('lastBookingPhone');
        
        if (savedBooking && lastBookingPhone) {
            const booking = JSON.parse(savedBooking);
            setBookingdetails(booking);
            setbookingsucess(true);
            
            // Set up countdown if booking is pending
            if (booking.status === 'pending' && booking.countdownEndsAt) {
                const timeLeft = Math.floor((new Date(booking.countdownEndsAt) - new Date()) / 1000);
                if (timeLeft > 0) {
                    setTimer(timeLeft);
                }
            }
        }
    }, []);

    // Countdown timer effect
    useEffect(() => {
        let countdownInterval;
        
        if (bookingDetails?.status === 'pending' && timer > 0) {
            countdownInterval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(countdownInterval);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [bookingDetails?.status, timer]);

    // Status check effect
    useEffect(() => {
        let statusCheckInterval;
        
        const startStatusCheck = async () => {
            if (bookingDetails?._id && bookingDetails?.status !== 'completed') {
                // Clear any existing interval
                if (statusCheckInterval) {
                    clearInterval(statusCheckInterval);
                }
                
                // Initial check
                const isCompleted = await checkBookingStatus(bookingDetails._id);
                
                if (!isCompleted) {
                    // Set up interval only if not completed
                    statusCheckInterval = setInterval(async () => {
                        const isCompleted = await checkBookingStatus(bookingDetails._id);
                        if (isCompleted) {
                            clearInterval(statusCheckInterval);
                        }
                    }, 5000);
                }
            }
        };

        startStatusCheck();

        return () => {
            if (statusCheckInterval) {
                clearInterval(statusCheckInterval);
            }
        };
    }, [bookingDetails?._id, bookingDetails?.status]);

    // Update localStorage when booking details change
    useEffect(() => {
        if (bookingDetails) {
            localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));
            localStorage.setItem('lastBookingPhone', bookingDetails.phone);
        }
    }, [bookingDetails]);

    const checkBookingStatus = async (bookingId) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`http://localhost:5000/api/booking/status/${bookingId}`);
            const statusData = response.data;
            
            setBookingdetails(prevDetails => ({
                ...prevDetails,
                status: statusData.status,
                technician: statusData.technician,
                completionDetails: statusData.completionDetails,
                countdownEndsAt: statusData.countdownEndsAt
            }));

            setIsLoading(false);
            return statusData.status === 'completed';
        } catch (error) {
            console.error('Error checking booking status:', error);
            setError('Failed to check booking status. Please try again.');
            setIsLoading(false);
            return false;
        }
    };

    const handleNewBooking = () => {
        // Only allow new booking if current booking is completed
        if (bookingDetails?.status === 'completed') {
            setbookingsucess(false);
            setBookingdetails(null);
            setformdata({
                customerName: '',
                phone: '',
                applianceType: '',
                description: '',
            });
            localStorage.removeItem('currentBooking');
            localStorage.removeItem('lastBookingPhone');
        }
    };

    const renderBookingStatus = () => {
        if (!bookingDetails) return null;

        const status = bookingDetails.status;
        const isPending = status === 'pending';
        const isAccepted = status === 'accepted';
        const isCompleted = status === 'completed';

        return (
            <StatusContainer>
                {isLoading && (
                    <div className="loading-indicator">
                        Checking status...
                    </div>
                )}
                
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button 
                            onClick={() => checkBookingStatus(bookingDetails._id)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                <StageContainer>
                    <StageLine />
                    <StageLineActive status={status} />
                    
                    <Stage>
                        <StageIcon active={isPending} completed={isAccepted || isCompleted}>
                            {isCompleted ? <FaCheckCircle /> : <FaClock />}
                        </StageIcon>
                        <StageLabel active={isPending} completed={isAccepted || isCompleted}>
                            Pending
                        </StageLabel>
                    </Stage>
                    
                    <Stage>
                        <StageIcon active={isAccepted} completed={isCompleted}>
                            {isCompleted ? <FaCheckCircle /> : <FaUserCheck />}
                        </StageIcon>
                        <StageLabel active={isAccepted} completed={isCompleted}>
                            Accepted
                        </StageLabel>
                    </Stage>
                    
                    <Stage>
                        <StageIcon active={isCompleted} completed={isCompleted}>
                            <FaCheckCircle />
                        </StageIcon>
                        <StageLabel active={isCompleted} completed={isCompleted}>
                            Completed
                        </StageLabel>
                    </Stage>
                </StageContainer>

                <StatusCard>
                    <StatusTitle>
                        {isPending && <><FaClock /> Booking Status: PENDING</>}
                        {isAccepted && <><FaUserCheck /> Booking Status: ACCEPTED</>}
                        {isCompleted && <><FaCheckCircle /> Booking Status: COMPLETED</>}
                    </StatusTitle>

                    <InfoRow><FaUser /> <strong>Customer:</strong> {bookingDetails.customerName}</InfoRow>
                    <InfoRow><FaPhoneAlt /> <strong>Phone:</strong> {bookingDetails.phone}</InfoRow>
                    <InfoRow><FaTools /> <strong>Appliance:</strong> {bookingDetails.applianceType}</InfoRow>
                    <InfoRow><FaHome /> <strong>Address/Issue:</strong> {bookingDetails.description}</InfoRow>

                    {isPending && (
                        <>
                            <InfoRow><FaInfoCircle /> <strong>Note:</strong> Waiting for technician to accept your booking</InfoRow>
                            <Timer>{formateTime(timer)}</Timer>
                            <p style={{ textAlign: 'center', color: '#e74c3c' }}>
                                Please wait while we find a technician for you...
                            </p>
                        </>
                    )}

                    {isAccepted && (
                        <TechnicianCard>
                            <h3 style={{ marginTop: 0 }}>Technician Assigned</h3>
                            <InfoRow><FaUser /> <strong>Name:</strong> {bookingDetails.technician?.name || 'Not assigned'}</InfoRow>
                            <InfoRow><FaPhoneAlt /> <strong>Contact:</strong> {bookingDetails.technician?.phonenumber || 'Not available'}</InfoRow>
                            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                                Your technician will contact you shortly.
                            </p>
                        </TechnicianCard>
                    )}

                    {isCompleted && (
                        <>
                            <CompletionCard>
                                <h3 style={{ marginTop: 0 }}>Service Completed</h3>
                                <InfoRow><FaClock /> <strong>Completed At:</strong> {new Date(bookingDetails.completionDetails?.completedAt).toLocaleString()}</InfoRow>
                                <InfoRow><FaInfoCircle /> <strong>Message:</strong> {bookingDetails.completionDetails?.completionMessage || 'No message'}</InfoRow>
                                <InfoRow><FaInfoCircle /> <strong>Service Notes:</strong> {bookingDetails.completionDetails?.serviceNotes || 'No notes'}</InfoRow>
                            </CompletionCard>
                            <NewBookingButton onClick={handleNewBooking}>
                                <FaTools /> Make New Booking
                            </NewBookingButton>
                        </>
                    )}
                </StatusCard>
            </StatusContainer>
        );
    };

    const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    };

    const formateTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const renderInfoSection = () => (
        <InfoSection>
            <InfoCard delay={0.2}>
                <InfoIcon>
                    <FaTools />
                </InfoIcon>
                <InfoContent>
                    <InfoTitle>Expert Repair Services</InfoTitle>
                    <InfoDescription>Professional technicians for all your appliance needs</InfoDescription>
                </InfoContent>
            </InfoCard>

            <InfoCard delay={0.4}>
                <InfoIcon>
                    <FaClock />
                </InfoIcon>
                <InfoContent>
                    <InfoTitle>Quick Response</InfoTitle>
                    <InfoDescription>Fast service within 24 hours of booking</InfoDescription>
                </InfoContent>
            </InfoCard>

            <InfoCard delay={0.6}>
                <InfoIcon>
                    <FaUserCheck />
                </InfoIcon>
                <InfoContent>
                    <InfoTitle>Verified Technicians</InfoTitle>
                    <InfoDescription>All our technicians are background checked</InfoDescription>
                </InfoContent>
            </InfoCard>

            <InfoCard delay={0.8}>
                <InfoIcon>
                    <FaHome />
                </InfoIcon>
                <InfoContent>
                    <InfoTitle>On-site Service</InfoTitle>
                    <InfoDescription>We come to your location for convenience</InfoDescription>
                </InfoContent>
            </InfoCard>
        </InfoSection>
    );

    useEffect(() => {
        // Listen for booking updates
        socket.on('bookingUpdate', (updatedBooking) => {
            if (updatedBooking.phone === formdata.phone) {
                setBookingdetails(updatedBooking);
            }
        });

        // Listen for new bookings
        socket.on('newBooking', (newBooking) => {
            if (newBooking.phone === formdata.phone) {
                setBookingdetails(newBooking);
                setbookingsucess(true);
            }
        });

        // Cleanup on unmount
        return () => {
            socket.off('bookingUpdate');
            socket.off('newBooking');
        };
    }, [formdata.phone]);

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/booking', formdata);
            setBookingdetails(response.data);
            setbookingsucess(true);
            
            // Save to localStorage
            localStorage.setItem('currentBooking', JSON.stringify(response.data));
            localStorage.setItem('lastBookingPhone', formdata.phone);
            
            // Set initial timer if booking is pending
            if (response.data.status === 'pending' && response.data.countdownEndsAt) {
                const timeLeft = Math.floor((new Date(response.data.countdownEndsAt) - new Date()) / 1000);
                if (timeLeft > 0) {
                    setTimer(timeLeft);
                }
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert(error.response?.data?.message || 'Failed to create booking. Please try again.');
        }
    };

    return (
        <MainContainer>
            <FormSection>
                <Title>Book ElectroCare Services</Title>
                {!bookingsucess ? (
                    <Form onSubmit={handlesubmit}>
                        <Input
                            name="customerName"
                            type="text"
                            placeholder="Your Name"
                            value={formdata.customerName}
                            onChange={handlechange}
                            required
                        />
                        
                        <Input
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                            value={formdata.phone}
                            onChange={handlechange}
                            required
                        />
                        
                        <Input
                            name="applianceType"
                            type="text"
                            placeholder="Appliance Type (e.g., Refrigerator, Washing Machine)"
                            value={formdata.applianceType}
                            onChange={handlechange}
                            required
                        />
                        
                        <TextArea
                            name="description"
                            placeholder="Please enter your address and describe the issue"
                            value={formdata.description}
                            onChange={handlechange}
                            required
                        />
                        
                        <Button type="submit">
                            <FaTools /> Submit Booking
                        </Button>
                    </Form>
                ) : (
                    renderBookingStatus()
                )}
            </FormSection>
            
            {!bookingsucess && renderInfoSection()}
        </MainContainer>
    );
};

export default BookingForm;