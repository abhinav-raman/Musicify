import React, { useState, useRef, Fragment } from "react";
import { uploadBytes, ref } from "firebase/storage";

import { getItemDownloadUrl, storageRef } from "../firebase/FirebaseStorage";
import { setDataToDatabase } from "../firebase/FirebaseDatabase";

import Input from "./UI/Input";
import Button from "./UI/Button";

import successGif from "../assets/gifs/success.gif";
import spinner from "../assets/images/spinner-icon.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UploadForm = () => {
	const fileSelectElementRef = useRef(null);
	const history = useHistory();

	const [trackName, setTrackName] = useState("");
	const [artistName, setArtistName] = useState("");
	const [selectedFile, setSelectedFile] = useState(new File([], ""));
	const [isFileSelected, setIsFileSelected] = useState(false);
	const [isFileUploading, setIsFileUploading] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);

	const [errorInForm, setErrorInForm] = useState(false);
	const [errorInFormMessage, setErrorInFormMessage] = useState("");

	const trackNameChangeHandler = (event) => {
		setErrorInForm(false);
		setTrackName(event.target.value);
	};

	const artistNameChangeHandler = (event) => {
		setErrorInForm(false);
		setArtistName(event.target.value);
	};

	const fileSelectChangeHandler = (event) => {
		if (validateFileType(event.target.files[0])) {
			setErrorInForm(false);
			setIsFileSelected(true);
			setSelectedFile(event.target.files[0]);
		} else {
			setErrorInForm(true);
			setErrorInFormMessage(
				"Selected FileType not supported. Please select *.mp3 files only."
			);
		}
	};

	const fileRemoveHandler = () => {
		console.dir(fileSelectElementRef.current);
		fileSelectElementRef.current.value = "";
		setIsFileSelected(false);
		setSelectedFile({});
	};

	const validateFileType = (file) => {
		const fileType = file.name.split(".").pop();
		if (fileType.toLowerCase() === "mp3") {
			return true;
		}
		return false;
	};

	const setFileRelatedData = async ({ trackName, artistName, downloadUrl }) => {
		setDataToDatabase(trackName, artistName, downloadUrl)
			.then((response) => {
				setIsFileUploading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getDownloadUrl = async (url) => {
		getItemDownloadUrl(url)
			.then((response) => {
				const fileMetadata = {
					trackName: trackName,
					artistName: artistName,
					downloadUrl: response,
				};
				setFileRelatedData(fileMetadata);
				return response;
			})
			.catch((error) => {
				return error;
			});
	};

	const uploadFile = () => {
		setIsFileUploading(true);
		const musicFileRef = ref(storageRef, `${selectedFile.name}`);

		const metadata = {
			name: trackName,
		};

		const file = new File([selectedFile], trackName, {
			type: selectedFile.type,
		});

		uploadBytes(musicFileRef, file, metadata)
			.then(async (response) => {
				getDownloadUrl(response.metadata.fullPath);
				return response;
			})
			.catch((error) => {
				setIsFileUploading(false);
				return error;
			});
	};

	const navigateHomeHandler = () => {
		setIsFileUploaded(false);
		history.replace("/home");
	};

	const submitHandler = (event) => {
		event.preventDefault();
		console.log(isFileSelected);

		if (
			trackName.length === 0 &&
			artistName.length === 0 &&
			selectedFile.name.length === 0
		) {
			setErrorInFormMessage(
				"Track Name, artist name and file cannot be empty."
			);
			setErrorInForm(true);
			return;
		}

		if (trackName.length === 0 && artistName.length === 0) {
			setErrorInFormMessage("Track Name and artist name cannot be empty.");
			setErrorInForm(true);
			return;
		}

		if (trackName.length === 0) {
			setErrorInFormMessage("Track Name cannot be empty.");
			setErrorInForm(true);
			return;
		}

		if (artistName.length === 0) {
			setErrorInFormMessage("Artist Name cannot be empty.");
			setErrorInForm(true);
			return;
		}

		if (selectedFile.name.length === 0) {
			setErrorInFormMessage("Please select an *.mp3 file to upload.");
			setErrorInForm(true);
			return;
		}

		uploadFile();
		setIsFileUploaded(true);
	};

	const getSizeString = (sizeInBytes) => {
		if (sizeInBytes.toString().length > 6) {
			return `${(sizeInBytes / (1024 * 1024)).toPrecision(3)} MB`;
		} else if (sizeInBytes.toString().length > 3) {
			return `${(sizeInBytes / 1024).toPrecision(3) / 1024} KB`;
		}
		return `${sizeInBytes.toPrecision(3)} Bytes`;
	};

	const uploadForm = (
		<Fragment>
			<h2 className="w-full text-center mb-4 text-2xl text-green-700 font-semibold">
				Upload A Track
			</h2>
			<form onSubmit={submitHandler} className="w-full">
				<Input
					isInvalid={errorInForm && trackName.length === 0}
					value={trackName}
					onChange={trackNameChangeHandler}
					placeholder="Enter track name"
				/>
				<Input
					isInvalid={errorInForm && artistName.length === 0}
					value={artistName}
					onChange={artistNameChangeHandler}
					placeholder="Enter artist name"
				/>
				<input
					ref={fileSelectElementRef}
					onChange={fileSelectChangeHandler}
					type="file"
					accept="audio/mpeg"
					hidden
					multiple={false}
				/>
				{!isFileSelected ? (
					<section
						className={
							"duration-300 flex justify-center items-center w-full h-20 mb-2 cursor-pointer border-dashed border-2 text-slate-400 " +
							(errorInForm && !isFileSelected
								? " bg-red-50 border-red-500 hover:bg-red-100"
								: "bg-green-50 border-green-500 hover:bg-green-100")
						}
						onClick={() => fileSelectElementRef.current.click()}
					>
						CLick to select track (*.mp3 format)
					</section>
				) : (
					<div className="w-full h-20 flex justify-between items-center mb-2 p-4 bg-green-100">
						<p className="">
							File selected:{" "}
							<span className="font-medium">
								{selectedFile.name} ({getSizeString(selectedFile.size)})
							</span>
						</p>
						<div
							className="w-8 h-8 cursor-pointer duration-100 rounded-sm"
							onClick={fileRemoveHandler}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="30"
								height="30"
								viewBox="0 0 172 172"
								style={{ fill: "#000000" }}
							>
								<g
									fill="none"
									fillRule="nonzero"
									stroke="none"
									strokeWidth="1"
									strokeLinecap="butt"
									strokeLinejoin="miter"
									strokeMiterlimit="10"
									strokeDasharray=""
									strokeDashoffset="0"
									fontFamily="none"
									fontWeight="none"
									fontSize="none"
									textAnchor="none"
									style={{ mixBlendMode: "normal" }}
								>
									<path d="M0,172v-172h172v172z" fill="none"></path>
									<g fill="#ef4444">
										<path d="M40.13333,22.93333c-1.46702,0 -2.93565,0.55882 -4.05365,1.67969l-11.46667,11.46667c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l41.81302,41.81302l-41.81302,41.81302c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l11.46667,11.46667c2.24173,2.24173 5.87129,2.24173 8.10729,0l41.81302,-41.81302l41.81302,41.81302c2.236,2.24173 5.87129,2.24173 8.10729,0l11.46667,-11.46667c2.24173,-2.24173 2.24173,-5.87129 0,-8.10729l-41.81302,-41.81302l41.81302,-41.81302c2.24173,-2.236 2.24173,-5.87129 0,-8.10729l-11.46667,-11.46667c-2.24173,-2.24173 -5.87129,-2.24173 -8.10729,0l-41.81302,41.81302l-41.81302,-41.81302c-1.12087,-1.12087 -2.58663,-1.67969 -4.05365,-1.67969z"></path>
									</g>
								</g>
							</svg>
						</div>
					</div>
				)}

				<div className="w-full flex justify-center">
					<Button type="submit" className="border-2 bg-slate-100">
						Submit
					</Button>
				</div>

        {errorInForm && (
					<p className="w-full text-red-500 text-center">
						{errorInFormMessage}
					</p>
				)}
			</form>
		</Fragment>
	);

	const fileUploadedSuccessfully = (
		<Fragment>
			<h2 className="w-full text-center mb-4 text-2xl text-green-600 font-semibold">
				File Uploaded Successfully
			</h2>
			<div className="h-32">
				<img src={successGif} alt="success" className="mx-auto h-full"></img>
			</div>
			<h4 className="text-center">{trackName} is added to the collection</h4>
			<h2 className="text-center mt-4">
				Go back to{" "}
				<span
					className="cursor-pointer text-green-600"
					onClick={navigateHomeHandler}
				>
					Home
				</span>
			</h2>
		</Fragment>
	);

	const fileUploadingLoader = (
		<Fragment>
			<h2 className="w-full text-center mb-4 text-2xl text-green-600 font-semibold">
				File is Uploading...
			</h2>
			<div className="h-32">
				<img
					src={spinner}
					alt="success"
					className="mx-auto h-full animate-spin"
				></img>
			</div>
		</Fragment>
	);

	return (
		<section className="h-full flex justify-center items-center">
			<div className="dark-theme w-2/4 max-w-lg p-8 shadow-card-custom">
				{isFileUploading
					? fileUploadingLoader
					: isFileUploaded
					? fileUploadedSuccessfully
					: uploadForm}
			</div>
		</section>
	);
};

export default UploadForm;
