package org.gotson.komga.interfaces.web

import mu.KotlinLogging
import org.gotson.komga.domain.service.LibraryManager
import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.util.concurrent.RejectedExecutionException

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping("api/v1/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
class AdminController(
    private val libraryManager: LibraryManager
) {

  @PostMapping("rpc/thumbnails/regenerate/all")
  @ResponseStatus(HttpStatus.ACCEPTED)
  fun regenerateAllThumbnails() {
    try {
      libraryManager.regenerateAllThumbnails()
    } catch (e: RejectedExecutionException) {
      throw ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Thumbnail regeneration task is already running")
    }
  }

  @PostMapping("rpc/thumbnails/regenerate/missing")
  @ResponseStatus(HttpStatus.ACCEPTED)
  fun regenerateMissingThumbnails() {
    try {
      libraryManager.regenerateMissingThumbnails()
    } catch (e: RejectedExecutionException) {
      throw ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Thumbnail regeneration task is already running")
    }
  }
}