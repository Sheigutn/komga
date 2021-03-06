import { AxiosInstance } from 'axios'

const qs = require('qs')

const API_READLISTS = '/api/v1/readlists'

export default class KomgaReadListsService {
  private http: AxiosInstance

  constructor (http: AxiosInstance) {
    this.http = http
  }

  async getReadLists (libraryIds?: string[], pageRequest?: PageRequest, search?: string): Promise<Page<ReadListDto>> {
    try {
      const params = { ...pageRequest } as any
      if (libraryIds) params.library_id = libraryIds
      if (search) params.search = search

      return (await this.http.get(API_READLISTS, {
        params: params,
        paramsSerializer: params => qs.stringify(params, { indices: false }),
      })).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve readLists'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async getOneReadList (readListId: string): Promise<ReadListDto> {
    try {
      return (await this.http.get(`${API_READLISTS}/${readListId}`)).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve readList'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async postReadList (readList: ReadListCreationDto): Promise<ReadListDto> {
    try {
      return (await this.http.post(API_READLISTS, readList)).data
    } catch (e) {
      let msg = `An error occurred while trying to add readList '${readList.name}'`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async patchReadList (readListId: string, readList: ReadListUpdateDto) {
    try {
      await this.http.patch(`${API_READLISTS}/${readListId}`, readList)
    } catch (e) {
      let msg = `An error occurred while trying to update readList '${readListId}'`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async deleteReadList (readListId: string) {
    try {
      await this.http.delete(`${API_READLISTS}/${readListId}`)
    } catch (e) {
      let msg = `An error occurred while trying to delete readList '${readListId}'`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async getBooks (readListId: string, pageRequest?: PageRequest): Promise<Page<BookDto>> {
    try {
      const params = { ...pageRequest }
      return (await this.http.get(`${API_READLISTS}/${readListId}/books`, {
        params: params,
      })).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve books'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }
}
