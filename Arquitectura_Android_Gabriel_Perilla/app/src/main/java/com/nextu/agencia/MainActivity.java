package com.nextu.agencia;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private EditText nombreuser, pass;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.wtf("Ciclo de vida", "onCreate");

    }

    public void olvideDatos(View view) {

        Snackbar snackbar = Snackbar.make(view, "Desea recuperar su cuenta?", Snackbar.LENGTH_LONG)
            .setAction("Recuperar", new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(MainActivity.this, "La información se ha enviado a su email", Toast.LENGTH_LONG).show();
                    //Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://nextu.com"));
                    //startActivity(intent);
                }
            });
        snackbar.setActionTextColor(Color.CYAN);
        View snackBarView = snackbar.getView();
        snackBarView.setBackgroundColor(ContextCompat.getColor(this, R.color.colorPrimary));
        snackbar.show();
    }
    public void iniciaSesion(View view){
        Intent intent= new Intent(MainActivity.this, GaleriaActivity.class);
        nombreuser = (EditText) findViewById(R.id.nombreuser);
        pass = (EditText) findViewById(R.id.password);
        if (nombreuser.getText().toString().equals("") || pass.getText().toString().equals("")){
            Toast.makeText(MainActivity.this, "Debe digitar los datos completos", Toast.LENGTH_SHORT).show();
        }else {
            intent.putExtra("nombreuser", nombreuser.getText());
            intent.putExtra("pass", pass.getText());
            startActivity(intent);
        }
    }
    public void mandar(View view){

        Intent intent = new Intent(MainActivity.this, GaleriaActivity.class);
        intent.putExtra("variable_int", 123);
        intent.putExtra("variable_string","Variable");
        intent.putExtra("variable_double", 1.8);
        startActivity(intent);
    }
    @Override
    protected void onStart() {
        super.onStart();
        Log.wtf("Ciclo de vida", "onStart");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.wtf("Ciclo de vida", "onRestart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.wtf("Ciclo de vida", "onResume");
    }

}
