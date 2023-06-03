package com.Abdo.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Comment {

    @Id
    private String id;


    private String body;
    private String writerId;
    private String docId;

    private String writerName;
    private String writerImage;

    private Date TimeOfCreation = new Date();

    public Comment(String body, String writerId, String docId,String writerImage,String writerName) {
        this.body = body;
        this.writerId = writerId;
        this.docId = docId;
        this.writerImage = writerImage;
        this.writerName = getWriterName();
    }
}
