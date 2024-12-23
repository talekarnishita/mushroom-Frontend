import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [name, setName] = useState('');  // State for mushroom name
    const [image, setImage] = useState(null);  // State for the selected image
    const [message, setMessage] = useState('');  // State for response message

    // Handle image selection for upload
    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle name change
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // Handle image upload to the /api/upload endpoint
    const handleImageUploadToServer = async () => {
        if (!image) {
            setMessage('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:9177/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('Failed to upload image');
        }
    };

    // Handle form submission to the /api/addMushroom endpoint
    const handleAddMushroom = async () => {
        if (!name || !image) {
            setMessage('Please provide both name and image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:9177/api/addMushroom', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
        } catch (error) {
            console.error('Error adding mushroom:', error);
            setMessage('Failed to add mushroom');
        }
    };

    // Internal styling
    const styles = {
        container: {
            width: '100%',
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        h1: {
            textAlign: 'center',
            color: '#333',
        },
        formGroup: {
            marginBottom: '20px',
        },
        label: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#555',
            display: 'block',
            marginBottom: '8px',
        },
        inputField: {
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '10px',
            boxSizing: 'border-box',
        },
        inputFile: {
            padding: '5px',
        },
        button: {
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'background-color 0.3s',
        },
        btnUpload: {
            backgroundColor: '#4CAF50',
            color: 'white',
        },
        btnUploadHover: {
            backgroundColor: '#45a049',
        },
        btnAdd: {
            backgroundColor: '#008CBA',
            color: 'white',
        },
        btnAddHover: {
            backgroundColor: '#007bb5',
        },
        hr: {
            border: '1px solid #ddd',
            margin: '30px 0',
        },
        message: {
            fontSize: '14px',
            textAlign: 'center',
            color: '#f44336', // Red for error messages
        },
        messageSuccess: {
            color: '#4CAF50', // Green for success messages
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Mushroom Type Checker</h1> <hr/>
            
                      {/* Separate Input for adding mushroom */}
              {/* Input for mushroom name */}
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Mushroom Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    style={styles.inputField}
                    placeholder="Enter mushroom name"
                    required
                />
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="imageAdd" style={styles.label}>Upload Mushroom Image for Adding</label>
                <input
                    type="file"
                    id="imageAdd"
                    onChange={handleImageUpload}
                    style={styles.inputFile}
                    required
                />
            </div>

            {/* Button to add mushroom */}
            <button
                type="button"
                onClick={handleAddMushroom}
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.btnAddHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.btnAdd.backgroundColor)}
            >
                Add Mushroom
            </button>
            <hr/>

            {/* Display success or error message */}
<strong>            {message && <p style={message.startsWith('Failed') ? styles.message : { ...styles.message, ...styles.messageSuccess }}>{message}</p>}
</strong><hr/>

            {/* Separate Input for uploading mushroom image */}
            <div style={styles.formGroup}>
                <label htmlFor="imageUpload" style={styles.label}>Upload Mushroom Image for Checking</label>
                <input
                    type="file"
                    id="imageUpload"
                    onChange={handleImageUpload}
                    style={styles.inputFile}
                    required
                />
            </div>

            {/* Button to upload image */}
            <button
                type="button"
                onClick={handleImageUploadToServer}
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.btnUploadHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.btnUpload.backgroundColor)}
            >
                Upload Image
            </button>

            <hr style={styles.hr} />

        </div>
    );
}

export default Home;
