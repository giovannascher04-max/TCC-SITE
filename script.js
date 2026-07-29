console.log("SCRIPT CARREGADO");
const SUPABASE_URL =
'https://iwxwoydavqvchdikvcyo.supabase.co'

const SUPABASE_KEY =
'sb_publishable_0MVGlTXJ8xziXpNDqOCFGQ_vVS9DR8S'

const client =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
)

async function enviarsugestoes() {
    const nome =
        document.getElementById("nome").value

    const turma =
        document.getElementById("turma").value

    const sugestoes =
        document.getElementById("sugestoes").value

    const { error } =
        await client
        .from('sugestoes')
        .insert([
            {
                nome: nome,
                turma: turma,
                sugestoes: sugestoes
            }
        ])

    if(error){

        console.error(error)

        alert("Erro ao enviar")

        return
    }

    alert("Sugestao enviada!")

}