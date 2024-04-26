import { DataSource } from 'typeorm'

export const mock_data_source: Partial<DataSource> = {
    createQueryRunner: jest.fn().mockReturnValue({
        query: jest.fn().mockResolvedValue([{ num: 1234 }]),
        release: jest.fn(),
    }),
}
