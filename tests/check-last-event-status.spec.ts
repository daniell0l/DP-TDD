class CheckLastEventStatus {
     constructor(
        private loadLastEventRepository: LoadLastEventRepository
        ) {}

    async perform(groupId: string): Promise<void> {
        await this.loadLastEventRepository.loadLastEvent(groupId)

    }
}

interface LoadLastEventRepository {
    loadLastEvent: (groupId: string) => Promise<void> 

}

class LoadLastEventRepositoryMock implements LoadLastEventRepository {
    groupId?: string
    callsCount = 0

    async loadLastEvent(groupId: string): Promise<void> {
        this.groupId = groupId
        this.callsCount++
    }

} 


describe('CheckLastEventStatus', () => {
    it('should get last event data', async () => {
        const loadLastEventRepository = new LoadLastEventRepositoryMock()
        const sut = new CheckLastEventStatus(loadLastEventRepository)

        await sut.perform('any_group_id')

        expect(loadLastEventRepository.groupId).toBe('any_group_id')
        expect(loadLastEventRepository.callsCount).toBe(1)
    })
})