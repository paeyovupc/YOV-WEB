import React from "react";
import axios from 'axios';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import '../styles/Technologies.css';


import reactImg from "../images/react-css.jpg"
import apiImg from "../images/api.jpg"
import coquiImg from "../images/coqui1.jpg"
import sqlImg from "../images/database2.jpg"
import pythonImg from "../images/python.jpg"
import downloadImg from "../images/download.jpg"





export default function Technologies() {
 
 const downloadHelenaDB = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/get-database?name=helena_cat`,
        null,
        {
          headers: {
            'Content-Disposition': 'attachment; filename=helena_cat.zip',
            'Content-Type': 'application/zip'
          },
          responseType: 'arraybuffer'
        }
      )
      .then((res) => {
        console.log(res);
        const url = URL.createObjectURL(
          new Blob([res.data], { type: 'application/zip' })
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = 'helena_cat.zip';
        link.click();
        URL.revokeObjectURL(url);
      });
  };


 return (

    <div>

<div className="tech-grid">
     <div className="tech01">
        <span className="subtitle">Technologies Used</span>
     </div>
</div>
        
      <Box 
      // display="flex"
      // justifyContent="center"
      // alignItems="center"
      >
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
            <Card>
              <CardActionArea href="https://reactjs.org/">
                <CardMedia
                  component="img"
                  height="150"
                  image={reactImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  React JS + CSS
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  We used React for building user interfaces and CSS for styling our Website.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card>
              <CardActionArea href="https://github.com/coqui-ai">
                <CardMedia
                  component="img"
                  height="150"
                  image={coquiImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Coqui STT
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  🐸TTS is a library for advanced Text-to-Speech generation.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            
             <Card>
              <CardActionArea href="https://github.com/raquelpanapalen/PAE-YOV/blob/main/scripts/record_audio.py">
                <CardMedia
                  component="img"
                  height="150"
                  image={pythonImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Python 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  We used Python for backend part. Python script to record audios
                  </Typography>
                </CardContent>
              </CardActionArea>
             </Card> 
            
             <Card>
              <CardActionArea href="https://en.wikipedia.org/wiki/API">
                <CardMedia
                  component="img"
                  height="150"
                  image={apiImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    API 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> 
        </Stack>
        <br></br>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
           {/* <Card>
              <CardActionArea href="https://github.com/coqui-ai">
                <CardMedia
                  component="img"
                  height="150"
                  image={coquiImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Coqui STT API
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  🐸TTS is a library for advanced Text-to-Speech generation. 
                  </Typography>
                </CardContent>
              </CardActionArea>
</Card> */}
            <Card>
              <CardActionArea href="https://www.w3schools.com/sql/">
                <CardMedia
                  component="img"
                  height="150"
                  image={sqlImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Database 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We used SQL to manage the database in our project...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
           {/* <Card>
              <CardActionArea href="https://www.python.org/">
                <CardMedia
                  component="img"
                  height="150"
                  image={pythonImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Python
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Python is a programming language. We used it for backend part.
                  </Typography>
                </CardContent>
              </CardActionArea>
</Card> */}
            
            <Card>
              <CardActionArea href="https://www.openslr.org/resources/69/ca_es_female.zip">
                <CardMedia
                  component="img"
                  height="150"

                  image={downloadImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  OpenSLR Female (CAT) [804M] 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> 

            <Card>
              <CardActionArea href="https://www.openslr.org/resources/69/ca_es_male.zip">
                <CardMedia
                  component="img"
                  height="150"

                  image={downloadImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  OpenSLR Male (CAT) [1.0G] 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> 

            <Card>
              <CardActionArea href="https://data.keithito.com/data/speech/LJSpeech-1.1.tar.bz2">
                <CardMedia
                  component="img"
                  height="150"

                  image={downloadImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  LJ Speech Dataset (EN) [2.6G]
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> 
            
        </Stack>
        <br/>
      </Box>
    </div>

  );
}
