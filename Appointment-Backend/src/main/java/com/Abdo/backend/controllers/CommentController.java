package com.Abdo.backend.controllers;

import com.Abdo.backend.models.Comment;
import com.Abdo.backend.payload.response.MessageResponse;
import com.Abdo.backend.repositories.CommentRepository;
import com.Abdo.backend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/comments/{docId}")

    public List<Comment> getCommentsById(@PathVariable("docId") String docId) {
        List<Comment> comments = commentRepository.findByDocId(docId);
        return comments;
    }


    @PostMapping("/comment")

    public ResponseEntity<?> addComment(@RequestBody Comment comment) {

        String body = comment.getBody();
        if (containsJavaScriptCode(body)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid comment!"));
        }
        Comment com = new Comment(comment.getBody(), comment.getWriterId(), comment.getDocId(), comment.getWriterImage(), comment.getWriterName());

        commentService.createComment(comment);
        return ResponseEntity.ok().body(new MessageResponse((" Commented ! :)")));
    }

    private boolean containsJavaScriptCode(String input) {

        boolean containsScriptTags = input.matches("(?i).*<script.*>.*</script>.*");
        boolean containsEventAttributes = input.matches("(?i).*on\\w+.*=.*");
        boolean containsAlert = input.matches("(?i).*\\balert\\b.*");

        return containsScriptTags || containsEventAttributes || containsAlert;
    }

}
