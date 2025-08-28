// /pages/api/sync-notion.js
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export default async function handler(req, res) {
  // 보안을 위한 간단한 토큰 확인
  const authToken = req.headers.authorization
  if (authToken !== `Bearer ${process.env.SYNC_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      console.log('🔄 Notion sync triggered via API')
      
      // Notion 동기화 스크립트 실행
      const { stdout, stderr } = await execAsync('npm run sync:notion')
      
      console.log('Sync output:', stdout)
      if (stderr) console.error('Sync errors:', stderr)
      
      // 성공 응답
      res.status(200).json({ 
        success: true, 
        message: 'Content synchronized successfully',
        timestamp: new Date().toISOString()
      })
      
    } catch (error) {
      console.error('Sync failed:', error)
      res.status(500).json({ 
        success: false, 
        error: error.message 
      })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}