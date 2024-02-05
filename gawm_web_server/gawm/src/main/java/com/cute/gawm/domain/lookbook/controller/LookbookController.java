package com.cute.gawm.domain.lookbook.controller;

import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.domain.lookbook.dto.response.LookbookResponse;
import com.cute.gawm.domain.lookbook.service.LookbookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/look-book")
public class LookbookController {
    private final LookbookService lookbookService;

//    @GetMapping("/list")
//    public ResponseEntity<?> getLookbooks(){
//        return lookbookService.getLookbooks();
//    }

    @GetMapping("/{lookbookId}")
    public ResponseEntity<?> getLookbook(@PathVariable int lookbookId){
        return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), lookbookService.getLookbook(lookbookId)));
    }

//    @PostMapping("/")
//    public LookbookResponse postLookbook(){
//        lookbookService.createLookbook();
//        ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), ));
//    }

//    @PutMapping("/{look-book-id}")
//    public LookbookResponse putLookbook(@PathVariable int lookbookId){
//
//    }
//
//    @PostMapping("/{look-book-id}")
//    public LookbookResponse like(@PathVariable int lookbookId){
//
//    }
//
//    @DeleteMapping("/{look-book-id}")
//    public LookbookResponse deleteLookbook(@PathVariable int lookbookId){
//
//    }
//
//    @GetMapping("/following/list")
//    public LookbookResponse getFollowingLookbooks(@PathVariable int lookbookId){
//
//    }
//
//    @GetMapping()
//    public LookbookResponse searchLookbook(@RequestParam() String keyword){
//
//    }
//
//    @PostMapping("/{look-book-id}/bookmark")
//    public LookbookResponse bookmark(@PathVariable int lookbookId){
//
//    }
}
