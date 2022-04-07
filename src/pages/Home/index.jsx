import { useState, useContext } from "react";
import { Context } from "../../context";
import Container from "../../components/Container";
import Text from "../../components/Text";
import Stages from '../../components/Stages';
import Button from "../../components/Button";
import SelectGenre from "./Stages/SelectGenre";
import AddBookDetails from "./Stages/AddBookDetails";
import AddNewSubGenre from "./Stages/AddNewSubGenre";
import SelectSubGenre from "./Stages/SelectSubGenre";

const Home = () => {
	const numStages = 4;
	const [step, setStep] = useState(0);
	const [genreId, setGenreId] = useState(null);
	const { books, addBook } = useContext(Context)
	const [bookGenre, setBookGenre] = useState('');
	const [bookSubGenre, setBookSubGenre] = useState('');

	const getToPreviousStep = (currStep) => {
		if (currStep > 1) return currStep -= 1; 
		return 0;
	}

	const goToNextStep = (currStep) => {
		if (currStep < numStages) return currStep += 1;
		return numStages;
	}

	const resetFormState = () => {
		setStep(0);
		setBookGenre('');
		setBookSubGenre('');
	}

	return (
		<Container paddingLeft={200} paddingRight={200} paddingTop={60} paddingBottom={60} justifyContent="center">
			<Container block fullWidth border borderRadius={10} paddingLeft={45} paddingRight={45} paddingTop={25} paddingBottom={25}>
				{step < numStages && <Text color="primary" type="p" text="Add book - New book" bold size="md" />}
				{step < numStages && <Stages numberOfStages={numStages} currentStage={step}/>}
				{step === 0 && 
					<SelectGenre 
						selectedGenre={bookGenre}
						disabled={bookGenre === ''}
						goBack={() => setStep(getToPreviousStep(step))}
						goForward={() => setStep(goToNextStep(step))}
						updateSelectedGenre={(name, id) => {
							setGenreId(id);
							setBookGenre(name);
						}}
					/>
				}
				{step === 1 && 
					<SelectSubGenre 
						selectedGenre={bookGenre}
						selectedGenreId={genreId}
						selectedSubGenre={bookSubGenre}
						disabled={bookSubGenre === ''}
						goBack={() => setStep(getToPreviousStep(step))}
						goForward={(num) => setStep(goToNextStep(step + num))}
						updateSelectedSubGenre={(name) => setBookSubGenre(name)}
					/>
				}
				{step === 2 && 
					<AddNewSubGenre
						selectedGenreId={genreId}
						subGenre={bookSubGenre}
						disabled={bookSubGenre === ''}
						goBack={() => setStep(getToPreviousStep(step))}
						goForward={() => setStep(goToNextStep(step))}
						setSubGenre={(text) => setBookSubGenre(text)}
					/>
				}
				{step === 3 && 
					<AddBookDetails
						selectedGenreId = {genreId}
						goBack={() => setStep(getToPreviousStep(step))}
						goForward={() => setStep(goToNextStep(step))}
						AddNewSubGenre={(title, author, isbn, publisher, description) => {
							addBook({
								bookGenre,
								bookSubGenre,
								bookIsbn: isbn,
								bookAuthor: author,
								bookTitle: title,
								bookPublisher: publisher,
								bookDescription: description,
							})
						}}	
					/>
				}
				{step === 4 && (
					<Container block>
						<Text color="primary" type="p" text="Book added successfully" bold size="md" />
						<Button text="Add another book" onClick={() => {
							console.log(books)
							resetFormState();
						}}/>
					</Container>
				)}
			</Container>
		</Container>
	)
}

export default Home;