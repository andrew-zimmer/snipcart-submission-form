import React, { useState } from 'react'

// MATERIAL UI COMPONENTS
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';

// ICONS
import GetAppIcon from '@material-ui/icons/GetApp';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

// TRANSITIONS
import Slide from '@material-ui/core/Slide';

// // CUSTOM COMPONENTS
// import DeleteImageConfirmation from './DeleteImageConfirmation'

// PACKAGE DEPENDENCIES
import ReactHtmlParser from 'react-html-parser'

export default function SingleImageUploader({
    field,
    formMessage,
    setFormMessage,
    errors,
    formPrefill,
    setFormPrefill
}) {

    // const [inMedia, setInMedia] = useState(formMessage[field.api_field] ? formMessage[field.api_field] : null)
    const [outMedia, setOutMedia] = useState(null)

    // -----------------------
    //       SNACKBARS
    // -----------------------
    // Image cleared
    const [openCleared, setOpenCleared] = useState({
        open: false,
        Transition: Slide
    })
    // New Image
    const [openNewImage, setOpenNewImage] = useState({
        open: false,
        Transition: Slide
    })

    // SLIDE TRANSITION
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    const toggleSetOpenCleared = () => {
        setOpenCleared({
            ...openCleared,
            open: true
        })
    }

    const toggleSetOpenNewImage = () => {
        setOpenNewImage({
            ...openNewImage,
            open: true
        })
    }

    const closeCleared = async () => {
        setTimeout(setOpenCleared({
            ...openCleared,
            open: false
        }), 2000)
    };

    const closeNew = () => {
        setTimeout(setOpenNewImage({
            ...openNewImage,
            open: false
        }), 2000)
    };


    // PLACEHOLDER LOGIC
    let placeholderImage = `https://place-hold.it/${field.minWidth ? field.minWidth : "800"}x${field.minHeight ? field.minHeight : "600"}`

    console.log(formPrefill);

    return (
        <div>
            {field.label &&
                <Typography variant="h5" className="mb-3 text-uppercase font-weight-light">
                    {field.label} {field.icon && ReactHtmlParser(field.icon)}
                </Typography>
            }
            <section
                style={{
                    backgroundImage: `url("${outMedia ? outMedia : formPrefill[field.api_field] ? formPrefill[field.api_field] : placeholderImage}")`,
                    height: `${field.previewHeight ? field.previewHeight : "30vh"}`,
                    width: '100%',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    objectFit: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative'
                }}
                className="m-0"
            >
                <div className="top-right-2">
                    {formMessage[field.api_field] ?
                        <span>
                            <a href={formPrefill[field.api_field]} download>
                                <label className="image-uploader-button mr-2" href={formPrefill[field.api_field]}>
                                    <GetAppIcon />
                                </label>
                            </a>
                            <input
                                id={field.uploadLabelId && field.uploadLabelId}
                                type="file"
                                accept="image/*"
                                onChange={(event) => setOutMedia(URL.createObjectURL(event.target.files[0]))}
                                hidden
                            />
                            <label htmlFor={field.uploadLabelId && field.uploadLabelId} className="image-uploader-button mr-2">
                                <CreateIcon />
                            </label>
                            <label className="image-uploader-button mr-2"
                                onClick={(event) => {
                                    setOutMedia(placeholderImage)
                                    setFormPrefill({
                                        ...formPrefill,
                                        [formPrefill[field.field_name]]: placeholderImage
                                    })
                                    toggleSetOpenCleared()
                                }}
                            >
                                <DeleteIcon />
                            </label>
                        </span>
                        :
                        outMedia ?
                            <span>
                                <input
                                    id={field.uploadLabelId && field.uploadLabelId}
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setOutMedia(URL.createObjectURL(event.target.files[0]))}
                                    hidden
                                />
                                <label htmlFor={field.uploadLabelId && field.uploadLabelId} className="image-uploader-button mr-2">
                                    <CreateIcon />
                                </label>
                                <span>
                                    <label className="image-uploader-button mr-2"
                                        onClick={() => {
                                            setOutMedia(null)
                                            setFormPrefill({
                                                ...formPrefill,
                                                [formPrefill[field.field_name]]: null
                                            })
                                            toggleSetOpenCleared()
                                        }}
                                    >
                                        <DeleteIcon />
                                    </label>
                                </span>
                            </span>
                            :
                            <span>
                                <input
                                    id={field.uploadLabelId && field.uploadLabelId}
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        setOutMedia(URL.createObjectURL(event.target.files[0]))
                                        toggleSetOpenNewImage()
                                    }}
                                    hidden
                                />
                                <label htmlFor={field.uploadLabelId && field.uploadLabelId} className="image-uploader-button mr-2">
                                    <AddToPhotosIcon />
                                </label>
                            </span>

                    }
                </div>
            </section>
            <Snackbar
                open={openCleared.open}
                onClose={closeCleared}
                autoHideDuration={5000}
                TransitionComponent={Slide}
                message="Image cleared."
                key={'cleared'}
                severity="error"
            />
            <Snackbar
                open={openNewImage.open}
                onClose={closeNew}
                autoHideDuration={5000}
                TransitionComponent={Slide}
                message="New image added."
                key={'new'}
                severity="info"
            />
        </div>
    )
}
