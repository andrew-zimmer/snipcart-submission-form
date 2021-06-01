import React, { useState } from 'react'

import { Button, FormControl, FormControlLabel, FormHelperText, FormGroup, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, NativeSelect, Select, Switch, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ImageUpload from './ImageUpload'


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = makeStyles((theme) => ({

}));

const currencies = [
  "usd",
  "cad",
  "eur",
  "aed",
  "afn",
  "all",
  "amd",
  "ang",
  "aoa",
  "ars",
  "aud",
  "awg",
  "azn",
  "bam",
  "bbd",
  "bdt",
  "bgn",
  "bhd",
  "bif",
  "bmd",
  "bnd",
  "bob",
  "brl",
  "bsd",
  "btn",
  "bwp",
  "byr",
  "bzd",
  "cdf",
  "chf",
  "clp",
  "cny",
  "cop",
  "crc",
  "cup",
  "cve",
  "czk",
  "djf",
  "dkk",
  "dop",
  "dzd",
  "egp",
  "ern",
  "etb",
  "fjd",
  "fkp",
  "gbp",
  "gel",
  "ghs",
  "gip",
  "gmd",
  "gnf",
  "gtq",
  "gyd",
  "hkd",
  "hnl",
  "hrk",
  "htg",
  "huf",
  "idr",
  "ils",
  "inr",
  "iqd",
  "irr",
  "isk",
  "jmd",
  "jod",
  "jpy",
  "kes",
  "kgs",
  "khr",
  "kmf",
  "kpw",
  "krw",
  "kwd",
  "kyd",
  "kzt",
  "lak",
  "lbp",
  "lkr",
  "lrd",
  "lsl",
  "ltl",
  "lvl",
  "lyd",
  "mad",
  "mdl",
  "mga",
  "mkd",
  "mmk",
  "mnt",
  "mop",
  "mro",
  "mur",
  "mvr",
  "mwk",
  "mxn",
  "myr",
  "mzn",
  "nad",
  "ngn",
  "nio",
  "nok",
  "npr",
  "nzd",
  "omr",
  "pab",
  "pen",
  "pgk",
  "php",
  "pkr",
  "pln",
  "pyg",
  "qar",
  "ron",
  "rsd",
  "rub",
  "rwf",
  "sar",
  "sbd",
  "scr",
  "sdg",
  "sek",
  "sgd",
  "shp",
  "sll",
  "sos",
  "srd",
  "ssp",
  "std",
  "syp",
  "szl",
  "thb",
  "tjs",
  "tmt",
  "tnd",
  "top",
  "try",
  "ttd",
  "twd",
  "tzs",
  "uah",
  "ugx",
  "uyu",
  "uzs",
  "vef",
  "vnd",
  "vuv",
  "wst",
  "xaf",
  "xcd",
  "xof",
  "xpf",
  "yer",
  "zar",
  "zmk",
  "zwl"
]
function App() {
  const classes = useStyles()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [displayReviews, setDisplayReview] = useState(false);
  const [status, setStatus] = useState('inStock');
  const [hoverEffect, setHoverEffect] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [websiteOrder, setWebsiteOrder] = useState();
  const [prices, setPrices] = useState({});
  const [currency, setCurrency] = useState('usd')
  const [price, setPrice] = useState('')
  const [mainPhoto, setMainPhoto] = useState({url: '', file: ''});
  const [productPhotos, setProductPhotos] = useState({url: '', file: ''});
  const [altPhoto, setAltPhoto] = useState([]);

  return (
    <Grid container>
      <form>
        <TextField
          label="Title"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
        >
          {title}
        </TextField>
        <CKEditor
                    editor={ ClassicEditor }
                    data={description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setDescription({data})
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        <TextField
          label="Website order number"
          type="number"
          onChange={(event) => setWebsiteOrder(event.target.value)}
        >
          {websiteOrder}
        </TextField>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              value={displayReviews}
              control={<Switch onChange={() => setDisplayReview(!displayReviews)} />}
              label="Display Review"
              labelPlacement="top"
            />
            <FormControlLabel
              value={hoverEffect}
              control={<Switch onChange={() => setHoverEffect(!hoverEffect)} />}
              label="Hover Effect"
              labelPlacement="top"
            />
            <FormControlLabel
              value={featured}
              control={<Switch onChange={() => setFeatured(!featured)} />}
              label="Display Review"
              labelPlacement="top"
            />
          </FormGroup>
        </FormControl>
        <FormControl>
          <InputLabel>
            Status
          </InputLabel>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <MenuItem value="inStock">In Stock</MenuItem>
            <MenuItem value="outOfStock">Out Of Stock</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Currency Type</InputLabel>
          <Select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            {currencies.map((currency) => {
              return (
                <MenuItem value={currency}>{currency}</MenuItem>
              )
            })}
          </Select>
          <TextField
            label="Price"
            type="number"
            onChange={(event) => setPrice(event.target.value)}
            value={price}
          />
        <Button
          onClick={() => {
            if (prices[currency]) {
              console.log('Price is already set with this currency')
            } else if (!price || !currency) {
              console.log('Please select a currency and/ or price')
            } else if (price <= 0) {
              console.log('Price can not be lower then are equal to zero')
            } else {
              setPrices({...prices, [currency]: price})
              setPrice('')
              setCurrency('')
            }
          }}
          variant="contained"
        >
          {'Set Price'}
        </Button>
        </FormControl>
        <div>
          <Typography>
            Set Prices
          </Typography>
          <List>
            {Object.keys(prices).map((key, _value) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={`${key}- ${prices[key]}`}
                  />
                  <Button
                    onClick={() => {
                      const newPrices = prices
                      delete prices[key]
                      setPrices({...newPrices})
                    }}
                  >
                    <HighlightOffIcon/>
                  </Button>
                </ListItem>
              )
            })}
          </List>
        </div>
        {/* main photo upload */}
        <Typography>
          Main Photo
        </Typography>
        <ImageUpload
          setImage={(url, file) => setMainPhoto({url: url, file: file})}
          image={mainPhoto}
        />
        {/* alt photo */}
        <Typography>
          Alt Photo
        </Typography>
        <ImageUpload
          setImage={(url, file) => setAltPhoto({url: url, file: file})}
          image={altPhoto}
        />
        {/* product photos */}
        <Typography>
          Product Photos
        </Typography>
        <ImageUpload
          setImage={(url, file) => {
            const newPhoto = {url: url, file: file}
            setProductPhotos([...productPhotos, newPhoto])
          }}
          image={productPhotos}
        />
      </form>
    </Grid>
  );
}

export default App;
