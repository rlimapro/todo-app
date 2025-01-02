package com.rlima.todo.controllers;

import com.rlima.todo.model.Tarefa;
import com.rlima.todo.repositories.TarefaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {
    private final TarefaRepository tarefaRepository;

    public TarefaController(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> getAllTarefas() {
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        return ResponseEntity.ok().body(tarefaList);
    }

    @PostMapping
    public ResponseEntity<Tarefa> createTarefa(@RequestBody Tarefa tarefa) {
        Tarefa tarefaCriada = tarefaRepository.save(tarefa);
        return ResponseEntity.ok().body(tarefaCriada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> updateTarefa(@PathVariable Long id, @RequestBody Tarefa tarefaAtualizada) {
        Tarefa obj = tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setDescricao(tarefaAtualizada.getDescricao());
            tarefa.setCompleta(tarefaAtualizada.isCompleta());
            return tarefaRepository.save(tarefa);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada."));

        return ResponseEntity.ok().body(obj);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        tarefaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
