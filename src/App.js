import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, Slider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px; /* Adjust the max-width as needed */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Logo = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const OutfitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

function App() {
  const [inputs, setInputs] = useState([
    { textInput: 'steampunk kanye west style', selectedOption: 'UPPER_BODY_HOODIES', sliderValue: 1.0 },
  ]);

  const [outfits, setOutfits] = useState([
    {
      items: [
        {
          category: 'UPPER_BODY_HOODIES',
          prompt: 'steampunk kanye west style',
          promptWeight: 1.0,
          imgUrl: 'https://d186jfxlkcwn3x.cloudfront.net/00129/001290386.jpg',
        },
        {
          category: 'LOWER_BODY_PANTS',
          prompt: 'steampunk kanye west style',
          promptWeight: 1.0,
          imgUrl: 'https://d186jfxlkcwn3x.cloudfront.net/00027/000270573.jpg',
        },
        {
          category: 'SHOES_SNEAKERS',
          prompt: 'steampunk kanye west style',
          promptWeight: 1.0,
          imgUrl: 'https://d186jfxlkcwn3x.cloudfront.net/00076/000760164.jpg',
        },
      ],
      score: 0.9,
    },
    // ... Placeholder outfits
  ]);

  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable


  const handleTextChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].textInput = e.target.value;
    setInputs(newInputs);
  };

  const handleDropdownChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].selectedOption = e.target.value;
    setInputs(newInputs);
  };

  const handleSliderChange = (e, newValue, index) => {
    const newInputs = [...inputs];
    newInputs[index].sliderValue = newValue;
    setInputs(newInputs);
  };

  const handleAddRow = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { textInput: '', selectedOption: 'UPPER_BODY_HOODIES', sliderValue: 1.0 }]);
    }
  };

  const handleRemoveRow = (index) => {
    if (inputs.length > 1) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        items: inputs.map((input) => ({
          category: input.selectedOption,
          prompt: input.textInput,
          promptWeight: input.sliderValue,
          imgUrl: null,
        })),
      };

      // ***** Make REAL API call here ****
      // Placeholder API endpoint
      // const response = await axios.post('https://api.example.com/submit', payload);

      // Placeholder for handling response
      // console.log('API Response:', response.data);

      // Update outfits state with placeholder response data
      // setOutfits([
      //   ...outfits,
      //   {
      //     items: response.data.items,
      //     score: response.data.score,
      //   },
      // ]);

      setFormSubmitted(true);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <Container>
      <Content>
        <Logo>fitformit</Logo>
        {inputs.map((input, index) => (
          <Row key={index}>
            <div>
              <label>Prompt:</label>
              <Input value={input.textInput} onChange={(e) => handleTextChange(e, index)} />
            </div>
            <div>
              <label>Category:</label>
              <Select value={input.selectedOption} onChange={(e) => handleDropdownChange(e, index)}>
                <MenuItem value="UPPER_BODY_HOODIES">Upper body hoodies</MenuItem>
                <MenuItem value="LOWER_BODY_PANTS">Lower body pants</MenuItem>
                <MenuItem value="SHOES_SNEAKERS">Shoes Sneakers</MenuItem>
              </Select>
            </div>
            <div>
              <label>Prompt Weight:</label>
              <Slider
                value={input.sliderValue}
                onChange={(e, newValue) => handleSliderChange(e, newValue, index)}
                min={0}
                max={1.0}
                step={0.01}
                valueLabelDisplay="auto"
              />
            </div>
            {index === inputs.length - 1 && index < 4 && (
              <Button onClick={handleAddRow}>+</Button>
            )}
            {inputs.length > 1 && (
              <Button onClick={() => handleRemoveRow(index)}>-</Button>
            )}
          </Row>
        ))}
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </ButtonContainer>

        {/* Display placeholder outfit data */}
        {formSubmitted && outfits.map((outfit, outfitIndex) => (
          <OutfitContainer key={outfitIndex}>
            <div>
              <strong>Outfit {outfitIndex + 1}</strong>
            </div>
            <div>
              <strong>Score:</strong> {outfit.score}
            </div>
            {outfit.items.map((item, itemIndex) => (
              <Row key={itemIndex}>
                <div>
                  <label>Prompt: {item.prompt}</label>
                </div>
                <div>
                  <label>Category: {item.category}</label>
                </div>
                <div>
                  <label>Prompt Weight: {item.promptWeight}</label>
                </div>
                <div>
                  <img src={item.imgUrl} alt={`Outfit ${outfitIndex + 1}, Item ${itemIndex + 1}`} style={{ width: '100px', height: '100px' }} />
                </div>
              </Row>
            ))}
          </OutfitContainer>
        ))}
      </Content>
    </Container>
  );
}

export default App;
