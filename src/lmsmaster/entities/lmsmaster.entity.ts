export class Lmsmaster {
    topic_name: string;
    subtopic_name: string;
    completed?: string; // Optional field
}

export class LmsUserDto {
  topic_name: string;
  subtopic_name: string;
  completed: boolean;
  userid: string;
}