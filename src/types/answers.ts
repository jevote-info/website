import Category from './category';
import Choice from './choice';
import Question from './question';

type Answers = Record<
  Category['id'],
  Record<Question['id'], { choiceId: Choice['id']; weight: number }>
>;

export default Answers;
