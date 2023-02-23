package com.generalassembly.contacts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@RestController
public class ContactsApplication {
	@Autowired
	private PersonRepository personRepository;

	public static void main(String[] args) {
		SpringApplication.run(ContactsApplication.class, args);
	}

	@GetMapping("/people")
	public Iterable<Person> index() {
		return personRepository.findAll();
	}

	@PostMapping("/people")
	public Iterable<Person> create (@RequestBody Person personData) {
		personRepository.save(personData);
		return personRepository.findAll();
	}

	@DeleteMapping("/people/{id}")
	public Iterable<Person> delete(@PathVariable int id) {
		personRepository.deleteById(id);
		return personRepository.findAll();
	}

	@PutMapping("/people/{id}")
	public Iterable<Person> update(@PathVariable int id, @RequestBody Person personData) {
		personData.setId(id);
		personRepository.save(personData);
		return personRepository.findAll();
	}

}
